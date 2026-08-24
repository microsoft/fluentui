export { NavCategoryItem, navCategoryItemClassNames, useNavCategoryItemStyles } from './components/Nav/NavCategoryItem';
export type {
  NavCategoryItemContextValues,
  NavCategoryItemProps,
  NavCategoryItemSlots,
  NavCategoryItemState,
} from './components/Nav/NavCategoryItem';

/** Headless building blocks, re-exported for consumers composing their own NavCategoryItem. */
export {
  NavCategoryItemProvider,
  renderNavCategoryItem,
  useNavCategoryItem,
  useNavCategoryItemContext,
  useNavCategoryItemContextValues,
} from '@fluentui/react-headless-components-preview/nav';
