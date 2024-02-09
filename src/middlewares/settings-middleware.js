(function () {
  const vscode = acquireVsCodeApi();

  // This is an example of how to send a message to the extension backend
  vscode.postMessage({
    action: "actionName",
    data: {},
  });
})();
