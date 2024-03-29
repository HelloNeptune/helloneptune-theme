import { createRoot } from "react-dom/client";
import { WebviewApi, WithWebviewContext } from "./view-context";
import { SettingsView } from "./settings-view";

export const Views = {
  'view.settings': SettingsView,
} as const;

export type ViewKey = keyof typeof Views;

export function render<V extends ViewKey>(
  key: V,
  vscodeApi: WebviewApi,
  publicPath: string,
  rootId = "root"
) {
  const container = document.getElementById(rootId);
  if (!container) {
    throw new Error(`Root element not found`);
  }

  __webpack_public_path__ = publicPath;

  const Component: React.ComponentType = Views[key];
  const root = createRoot(container);

  root.render(
    <WithWebviewContext vscodeApi={vscodeApi}>
      <Component />
    </WithWebviewContext>
  );
}
