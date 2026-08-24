export {
  NavSectionHeader,
  navSectionHeaderClassNames,
  useNavSectionHeaderStyles,
} from './components/Nav/NavSectionHeader';
export type {
  NavSectionHeaderProps,
  NavSectionHeaderSlots,
  NavSectionHeaderState,
} from './components/Nav/NavSectionHeader';

/** Headless building blocks, re-exported for consumers composing their own NavSectionHeader. */
export { renderNavSectionHeader, useNavSectionHeader } from '@fluentui/react-headless-components-preview/nav';
