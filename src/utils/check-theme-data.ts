import { parse } from "jsonc-parser";
import { TokenColor, UiColor } from "src/types/theme";

export const checkThemeData = (
  raw: string
): {
  tokenColors: TokenColor[];
  colors: UiColor;
} | null => {
  try {
    return parse(raw);
  } catch (e) {
    console.log(e);
    return null;
  }
};
