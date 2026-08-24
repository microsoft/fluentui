export { NavCategoryItem, navCategoryItemClassNames, useNavCategoryItemStyles } from './components/NavCategoryItem';
export type {
  NavCategoryItemContextValues,
  NavCategoryItemProps,
  NavCategoryItemSlots,
  NavCategoryItemState,
} from './components/NavCategoryItem';

/** Headless building blocks, re-exported for consumers composing their own NavCategoryItem. */
export {
  NavCategoryItemProvider,
  renderNavCategoryItem,
  useNavCategoryItem,
  useNavCategoryItemContext,
  useNavCategoryItemContextValues,
} from '@fluentui/react-headless-components-preview/nav';
