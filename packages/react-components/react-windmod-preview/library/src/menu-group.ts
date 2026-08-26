export { MenuGroup, menuGroupClassNames, useMenuGroupStyles } from './components/MenuGroup';
export type { MenuGroupContextValues, MenuGroupProps, MenuGroupSlots, MenuGroupState } from './components/MenuGroup';

/** Headless building blocks, re-exported for consumers composing their own MenuGroup. */
export {
  renderMenuGroup,
  useMenuGroup,
  useMenuGroupContextValues,
} from '@fluentui/react-headless-components-preview/menu';
