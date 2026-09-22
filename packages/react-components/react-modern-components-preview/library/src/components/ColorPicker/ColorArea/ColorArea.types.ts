import type {
  ColorAreaProps as ColorAreaBaseProps,
  ColorAreaState as ColorAreaBaseState,
} from '@fluentui/react-headless-components-preview/color-picker';
export type { ColorAreaSlots } from '@fluentui/react-headless-components-preview/color-picker';

export type ColorAreaProps = ColorAreaBaseProps & {
  /**
   * The shape of the color area.
   *
   * @default 'rounded'
   */
  shape?: 'rounded' | 'square';
};

export type ColorAreaState = ColorAreaBaseState & {
  shape: NonNullable<ColorAreaProps['shape']>;
  root: ColorAreaBaseState['root'] & {
    'data-shape': NonNullable<ColorAreaProps['shape']>;
  };
};
