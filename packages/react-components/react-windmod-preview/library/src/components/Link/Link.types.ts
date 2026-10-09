import type {
  LinkProps as LinkHeadlessProps,
  LinkState as LinkHeadlessState,
} from '@fluentui/react-headless-components-preview/link';

export type { LinkSlots } from '@fluentui/react-headless-components-preview/link';

/** Appearance of the Link. */
export type LinkAppearance = 'default' | 'subtle';

/**
 * Windmod Link props: the headless link plus the look props the headless surface deliberately
 * omits (they exist purely to select styles). `disabled` and `disabledFocusable` are not among
 * them — they stay headless props, and headless folds both into the state's `disabled`.
 */
export type LinkProps = LinkHeadlessProps & {
  /** @default 'default' */
  appearance?: LinkAppearance;
  /** @default false */
  inline?: boolean;
};

/** Windmod Link state: headless state plus the resolved look props. */
export type LinkState = LinkHeadlessState & Required<Pick<LinkProps, 'appearance' | 'inline'>>;
