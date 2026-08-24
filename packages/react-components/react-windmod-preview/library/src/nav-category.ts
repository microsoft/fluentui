export { NavCategory } from './components/NavCategory';
export type { NavCategoryContextValues, NavCategoryProps, NavCategoryState } from './components/NavCategory';

/** Headless building blocks, re-exported for consumers composing their own NavCategory. */
export {
  NavCategoryProvider,
  renderNavCategory,
  useNavCategory,
  useNavCategoryContext,
  useNavCategoryContextValues,
} from '@fluentui/react-headless-components-preview/nav';
