/**
 * @see https://code.visualstudio.com/api/references/theme-color
 * https://github.com/microsoft/vscode/blob/main/src/vs/workbench/services/themes/common/workbenchThemeService.ts
 */

export type UiColor = { [key: string]: string };

export type TokenColor = {
  name?: string;
  scope?: string | string[];
  settings: TokenColorSettings;
};

export type TokenColorSettings = {
  foreground?: string;
  background?: string;
  fontStyle?: string;
};
