import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utilities';
import { ColorTokens, RecursivePartial, SizeValue, FontTokens } from '@fluentui/react-theme-provider/lib/compat/index';

/**
 * {@docCategory Divider}
 */
export interface DividerProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  tokens?: RecursivePartial<DividerTokens>;

  /**
   * A divider can justify the content. Center is default.
   */
  alignContent?: 'start' | 'end' | 'center';

  appearance?: 'default' | 'subtle' | 'brand' | 'strong';

  children?: any;

  /* A divider can have a overriding color */
  color?: string;

  /* A divider can remove any extra margins before or after the element */
  fitted?: boolean;

  /* important will emphasis the content */
  important?: boolean;

  inset?: boolean;

  /* The size is a multiplier value for the size */
  size?: SizeValue;

  /* A divider can be horizontal (default) or verticle*/
  vertical?: boolean;

  height?: string;
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
