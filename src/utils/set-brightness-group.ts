import colorsea from "colorsea";
import { TokenColor, UiColor } from "src/types/theme";

export const setBrightnessGroup = (
  group: TokenColor[] | UiColor,
  percent: number
) => {
  const value = (-50 + percent) * 2;

  let newGroup: TokenColor[] | UiColor = group;
  try {
    if (Array.isArray(group)) {
      newGroup = group.map((item) => {
        const settings = item.settings as TokenColor["settings"];
        return {
          ...item,
          settings: {
            ...settings,
            foreground: colorsea(settings.foreground as any)
              .lighten(value)
              .hex(),
          },
        };
      });
    } else if (
      typeof group === "object" &&
      !Array.isArray(group) &&
      group !== null
    ) {
      let tempGroup: UiColor = {};

      Object.keys(group).forEach((item) => {
        tempGroup[item] = colorsea(group[item]).lighten(value).hex();
      });

      if (!!Object.keys(tempGroup).length) {
        newGroup = tempGroup;
      }
    }

    return newGroup;
  } catch (e) {
    return group;
  }
};
