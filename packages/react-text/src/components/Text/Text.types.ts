import { BaseSlots, ComponentProps, SlotProps } from '@fluentui/react-compose';
import { RecursivePartial } from '@fluentui/theme';
import * as React from 'react';

export interface TextProps extends ComponentProps, React.ImgHTMLAttributes<HTMLSpanElement> {
  /** A text can define its look via defined variants. */
  variant?: 'caption' | 'body' | 'subHeadline' | 'headline' | 'title1' | 'title2' | 'title3' | 'largeTitle' | 'display';

  tokens?: RecursivePartial<TextTokenSet>;
}

export interface TextSlots extends BaseSlots {}

export type TextSlotProps = SlotProps<TextSlots, TextProps, React.HTMLAttributes<HTMLSpanElement>>;

export type TextTokenSet = {};
