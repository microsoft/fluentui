import type {
  CardProps as CardHeadlessProps,
  CardState as CardHeadlessState,
} from '@fluentui/react-headless-components-preview/card';

export type {
  CardContextValue,
  CardOnSelectionChangeEvent,
  CardSlots,
} from '@fluentui/react-headless-components-preview/card';

/** Visual style of the Card. `'filled'` is the base look. */
export type CardAppearance = 'filled' | 'filled-alternative' | 'outline' | 'subtle';

/** Layout direction of the Card's children. */
export type CardOrientation = 'horizontal' | 'vertical';

/** Padding, gap and corner radius scale of the Card. */
export type CardSize = 'small' | 'medium' | 'large';

export type CardProps = CardHeadlessProps & {
  /** @default 'filled' */
  appearance?: CardAppearance;
  /** @default 'vertical' */
  orientation?: CardOrientation;
  /** @default 'medium' */
  size?: CardSize;
};

export type CardState = CardHeadlessState & Required<Pick<CardProps, 'appearance' | 'orientation' | 'size'>>;
