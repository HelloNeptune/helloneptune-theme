import { WebviewViewProvider, WebviewView, Webview, Uri, EventEmitter, window } from "vscode";
import * as ReactDOMServer from "react-dom/server";
import { getNonce } from "../utils";
import { SettingsPanel } from '../components/settings-panel';


export class LeftPanelWebview implements WebviewViewProvider {

  constructor(
    private readonly extensionPath: Uri,
    private data: any,
    private _view: any = null
  ) { }

  private onDidChangeTreeData: EventEmitter<any | undefined | null | void> = new EventEmitter<any | undefined | null | void>();

  refresh(context: any): void {
    this.onDidChangeTreeData.fire(null);
    this._view.webview.html = this._getHtmlForWebview(this._view?.webview);
  }

  resolveWebviewView(webviewView: WebviewView): void | Thenable<void> {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.extensionPath],
    };
    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
    this._view = webviewView;
    this.activateMessageListener();
  }

  private activateMessageListener() {
    this._view.webview.onDidReceiveMessage((message) => {
      switch (message.action) {
        case 'actionName':
          window.showWarningMessage(message.data.message);
          break;
      }
    });
  }

  private _getHtmlForWebview(webview: Webview) {
    const nonce = getNonce();

    const scriptUri = webview.asWebviewUri(
      Uri.joinPath(this.extensionPath, "src/middlewares", "settings-middleware.js")
    );

    const styleUri = webview.asWebviewUri(
      Uri.joinPath(this.extensionPath, "src/styles", "settings.css")
    );
console.log(styleUri)
    return `<html>
              <head>
                <meta charSet="utf-8"/>
                <meta http-equiv="Content-Security-Policy" 
                    content="default-src 'none';
                    img-src vscode-resource: https:;
                    font-src ${webview.cspSource};
                    style-src ${webview.cspSource} 'unsafe-inline';
                    script-src 'nonce-${nonce}';"
                  >
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link href="${styleUri}" rel="stylesheet">
              </head>
              <body>
                ${ReactDOMServer.renderToString((
      <SettingsPanel message={"Tutorial for Left Panel Webview in VSCode extension"}></SettingsPanel>
    ))
      }
					<script nonce="${nonce}" src="${scriptUri}"></script>
				</body>
            </html>`;
  }
}
