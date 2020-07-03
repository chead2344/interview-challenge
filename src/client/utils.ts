import { MenuItemData } from "./types";

export const flattenDietaries = (items: MenuItemData[]) =>
  items.reduce((acc, val) => acc.concat(val.dietaries), [] as string[]);

export const countUniqueDietaries = (dietaries: string[]) =>
  dietaries.reduce(
    (acc, current) => ({
      ...acc,
      [current]: acc[current] ? acc[current] + 1 : 1,
    }),
    {} as { [field: string]: number }
  );
