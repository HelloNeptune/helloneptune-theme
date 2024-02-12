import { TokenColor, UiColor } from "src/types/theme";
import { checkThemeData } from "./check-theme-data";

export const getThemeFields = (
  fields: string[],
  theme: ReturnType<typeof checkThemeData>,
  isUi: boolean = false
) => {
  let group: TokenColor[] | UiColor = [];

  if (!theme) return null;

  if (!isUi) {
    const temp: (TokenColor | undefined)[] = [];

    fields.forEach((token) => {
      temp.push(
        theme.tokenColors.find((item) =>
          item.scope && Array.isArray(item.scope)
            ? item.scope.some((item) => item === token)
            : item.scope === token
        )
      );
    });
    group = temp.filter(Boolean) as TokenColor[];
    console.log("g", group);
  } else {
    group = {};
    fields.forEach((field) => {
      (group as any)[field] = theme.colors[field];
    });
    console.log("g", group);
    if (!Object.keys(group).length) return null;
  }

  return group;
};
