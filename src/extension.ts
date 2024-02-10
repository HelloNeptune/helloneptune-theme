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

  const api: ViewApi = {
    setGlobalLuminosity: () => {
      console.log("aa");
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
