import { BaseSlots, ComponentProps, SlotProps } from '@fluentui/react-utils';
import { RecursivePartial } from '@fluentui/react-theme-provider/lib/compat/index';
import * as React from 'react';

export interface TextProps extends ComponentProps, React.HTMLAttributes<HTMLSpanElement> {
  /** A text can define its look via defined variants. */
  variant?: 'caption' | 'body' | 'subHeadline' | 'headline' | 'title1' | 'title2' | 'title3' | 'largeTitle' | 'display';

  tokens?: RecursivePartial<TextTokenSet>;
}

export interface TextSlots extends BaseSlots {}

export type TextSlotProps = SlotProps<TextSlots, TextProps, React.HTMLAttributes<HTMLSpanElement>>;

export type TextTokenSet = {};
