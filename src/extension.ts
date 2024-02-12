import * as vscode from "vscode";
import { ViewKey } from "./views";
import { registerView } from "./register-view";
import {
  ViewApi,
  ViewApiError,
  ViewApiEvent,
  ViewApiRequest,
  ViewApiResponse,
  ViewEvents,
} from "./types/view";
import { checkThemeData, setBrightnessGroup } from "./utils";
import { getThemeFields } from "./utils/get-theme-fields";
import { tokens, ui } from "./theme-fields/cyan";

// @ts-ignore
import themeRaw from "!!raw-loader!../themes/HelloNeptune-color-theme-first.json";

const theme = checkThemeData(themeRaw);

export const activate = async (ctx: vscode.ExtensionContext) => {
  const connectedViews: Partial<Record<ViewKey, vscode.WebviewView>> = {};

  const triggerEvent = <E extends keyof ViewEvents>(
    key: E,
    ...params: Parameters<ViewEvents[E]>
  ) => {
    Object.values(connectedViews).forEach((view) => {
      view.webview.postMessage({
        type: "event",
        key,
        value: params,
      } as ViewApiEvent<E>);
    });
  };

  const apply = (value: any, target: string) => {
    const settings = vscode.workspace.getConfiguration();

    try {
      settings.update(target, value, vscode.ConfigurationTarget.Global);
    } catch (e) {
      console.log(e);
    }
  };

  const api: ViewApi = {
    setUiLuminosity: async (percent) => {
      if (!theme) return;

      const group = getThemeFields(ui, theme, true);
      if (!group) return;

      const newColors = setBrightnessGroup(group, percent);
      apply({ "[HelloNeptune]": newColors }, "workbench.colorCustomizations");
    },
    setTokenLuminosity: async (percent) => {
      if (!theme) return;

      const group = getThemeFields(tokens, theme);
      if (!group) return;

      const newColors = setBrightnessGroup(group, percent);
      apply(
        { "[HelloNeptune]": { textMateRules: newColors } },
        "editor.tokenColorCustomizations"
      );
    },
  };

  const isViewApiRequest = <K extends keyof ViewApi>(
    msg: unknown
  ): msg is ViewApiRequest<K> =>
    msg != null &&
    typeof msg === "object" &&
    "type" in msg &&
    msg.type === "request";

  const registerAndConnectView = async <V extends ViewKey>(key: V) => {
    const view = await registerView(ctx, key);
    connectedViews[key] = view;

    const onMessage = async (msg: Record<string, unknown>) => {
      if (!isViewApiRequest(msg)) {
        return;
      }

      try {
        // @ts-ignore
        const val = await Promise.resolve(api[msg.key](...msg.params));
        const res: ViewApiResponse = {
          type: "response",
          id: msg.id,
          value: val,
        };
        view.webview.postMessage(res);
      } catch (e: unknown) {
        const err: ViewApiError = {
          type: "error",
          id: msg.id,
          value:
            e instanceof Error ? e.message : "An unexpected error occurred",
        };
        view.webview.postMessage(err);
      }
    };

    view.webview.onDidReceiveMessage(onMessage);
  };

  registerAndConnectView("view.settings");
};

export const deactivate = () => {
  return;
};
