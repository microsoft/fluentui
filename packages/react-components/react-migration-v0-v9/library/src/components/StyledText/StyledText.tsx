/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';
import { getIntrinsicElementProps, mergeClasses, Slot, ComponentProps, slot } from '@fluentui/react-components';
import { useSizeStyles, useStyles, useWeightStyles } from './StyledText.styles';

export type StyledTextSlots = {
  root: Slot<'span', 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'pre' | 'time'>;
};

export type StyledTextProps = ComponentProps<StyledTextSlots> & {
  /**
   * Aligns text based on the parent container.
   */
  align?: 'start' | 'center' | 'end' | 'justify';

  /**
   * At mentions can be formatted to draw users' attention.
   * Mentions for "me" can be formatted to appear differently.
   */
  atMention?: 'me' | boolean;

  /**
   * Set as disabled StyledText component
   */
  disabled?: boolean;

  /**
   * Set as error StyledText component
   */
  error?: boolean;

  /**
   * The StyledText can appear more important and draw user's attention
   */
  important?: boolean;

  /**
   * Applies font size and line height based on the theme tokens.
   */
  size?:
    | 'smaller'
    | 'small'
    | 'medium'
    | 'large'
    | 'large500'
    | 'larger'
    | 'largest'
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700;

  /**
   * Set as success StyledText component
   */
  success?: boolean;

  /**
   * The text can signify a temporary state
   */
  temporary?: boolean;

  /**
   * Set as timestamp StyledText component
   */
  timestamp?: boolean;

  /**
   * Truncate overflowing text for block displays.
   */
  truncate?: boolean;

  /**
   * Applies font weight to the content.
   */
  weight?: 'light' | 'semilight' | 'regular' | 'medium' | 'semibold' | 'bold';

  /**
   * Wraps the text content on white spaces.
   *
   * @default true
   */
  wrap?: boolean;
};

export const styledTextClassName = 'fui-StyledText';

const sizeMap: Record<string, 'base100' | 'base200' | 'base300' | 'base400' | 'base500' | 'base600' | 'hero700'> = {
  '100': 'base100',
  '200': 'base200',
  '300': 'base300',
  '400': 'base400',
  '500': 'base500',
  '600': 'base600',
  '700': 'hero700',
  smaller: 'base100',
  small: 'base200',
  medium: 'base300',
  large: 'base400',
  large500: 'base500',
  larger: 'base600',
  largest: 'hero700',
};

export const StyledText = React.forwardRef<HTMLSpanElement, StyledTextProps>((props, ref) => {
  const {
    align,
    atMention,
    disabled,
    error,
    important,
    success,
    temporary,
    timestamp,
    truncate,
    weight,
    wrap = true,
  } = props;

  const dir = typeof props.children === 'string' ? 'auto' : undefined;

  const sizeStyles = useSizeStyles();
  const weightStyles = useWeightStyles();
  const styles = useStyles();

  const size = props.size ? sizeMap[props.size] : props.size;

  const RootSlot = slot.always(
    getIntrinsicElementProps('span', {
      ref,
      ...props,
      dir,
      className: mergeClasses(
        styledTextClassName,
        size && sizeStyles[size],
        weight && weightStyles[weight],
        wrap === false && styles.nowrap,
        truncate && styles.truncate,
        align === 'center' && styles.alignCenter,
        align === 'end' && styles.alignEnd,
        align === 'justify' && styles.alignJustify,

        atMention && styles.mention,
        atMention === 'me' && styles.mentionMe,
        disabled && styles.disabled,
        error && styles.error,
        important && styles.important,
        success && styles.success,
        temporary && styles.temporary,
        timestamp && styles.timestamp,
        props.className,
      ),
    }),
    { elementType: 'span' },
  );

  return <RootSlot />;
});

StyledText.displayName = 'StyledText';
