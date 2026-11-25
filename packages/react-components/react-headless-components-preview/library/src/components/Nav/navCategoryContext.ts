export { NavCategoryProvider, useNavCategoryContext_unstable as useNavCategoryContext } from '@fluentui/react-nav';

export type { NavCategoryContextValues } from '@fluentui/react-nav';

/** Value stored inside the NavCategory context. */
export type NavCategoryContextValue = {
  open: boolean;
  value: string;
};
