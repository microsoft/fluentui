import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utilities';
import { ColorTokens, RecursivePartial, FontTokens } from '@fluentui/react-theme-provider/lib/compat/index';

/**
 * {@docCategory Divider}
 */
export interface DividerProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  tokens?: RecursivePartial<DividerTokens>;

  /**
   * Determines the alignment of the content within the divider.
   * @defaultvalue 'center'
   */
  alignContent?: 'start' | 'end' | 'center';

  appearance?: 'default' | 'subtle' | 'brand' | 'strong';

  children?: any;

  /* A divider can have a overriding border color */
  color?: string;

  /* A divider can be classified as important to emphasize its content */
  important?: boolean;

  inset?: boolean;

  /* A divider can be horizontal (default) or vertical*/
  vertical?: boolean;

  /* Overrides for border visuals */
  borderStyle?: string;
  borderSize?: string | number;
}

/**
 * {@docCategory Divider}
 */
export interface DividerState extends DividerProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;
}

/**
 * {@docCategory Divider}
 */
export type DividerTokens = ColorTokens & FontTokens & DividerProps & {};

/**
 * {@docCategory Divider}
 */
export type DividerVariants<TTokens = DividerTokens> = {
  root?: TTokens;
};
