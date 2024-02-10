
export interface WebviewApi<StateType> {
  postMessage(message: unknown): void;
  getState(): StateType | undefined;
  setState<T extends StateType | undefined>(newState: T): T;
}

declare global {
  declare var __webpack_public_path__: string;
  declare module "*.ejs" {
    const template = <T>(data: T): string => "";
    export default template;
  }
  function acquireVsCodeApi<StateType = unknown>(): WebviewApi<StateType>;
}
