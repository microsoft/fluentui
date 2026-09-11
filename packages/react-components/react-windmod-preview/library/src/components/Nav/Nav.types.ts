import type {
  NavProps as NavHeadlessProps,
  NavState as NavHeadlessState,
} from '@fluentui/react-headless-components-preview/nav';

export type {
  NavContextValues,
  NavItemValue,
  NavSlots,
  OnNavItemSelectData,
} from '@fluentui/react-headless-components-preview/nav';

/** Vertical density of the Nav and every row inside it. */
export type NavDensity = 'small' | 'medium';

/**
 * Windmod Nav props: the headless nav plus the look prop the headless surface deliberately
 * omits (it exists purely to select styles, on the rows rather than on the Nav itself).
 */
export type NavProps = NavHeadlessProps & {
  /** @default 'medium' */
  density?: NavDensity;
};

/** Windmod Nav state: headless state plus the resolved look prop. */
export type NavState = NavHeadlessState & Required<Pick<NavProps, 'density'>>;
