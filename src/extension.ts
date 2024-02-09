import * as vscode from "vscode";
import { PANEL_SETTINGS_VIEW_ID } from "./constants";
import { LeftPanelWebview } from "./providers/settings-webview-provider";

export function activate(context: vscode.ExtensionContext) {
	let helloWorldCommand = vscode.commands.registerCommand(
		"vscode-webview-extension-with-react.helloWorld",
		() => {
			vscode.window.showInformationMessage(
				"Hello World from vscode-webview-extension-with-react!"
			);
		}
	);
	context.subscriptions.push(helloWorldCommand);

	// Register view
	const leftPanelWebViewProvider = new LeftPanelWebview(context?.extensionUri, {});

	let view = vscode.window.registerWebviewViewProvider(
		PANEL_SETTINGS_VIEW_ID,
		leftPanelWebViewProvider,
	);
	context.subscriptions.push(view);

};

// this method is called when your extension is deactivated
export function deactivate() {}
