import { ComponentProps } from '@fluentui/react-utilities';
import * as React from 'react';

export interface TextProps extends ComponentProps, React.HTMLAttributes<HTMLSpanElement> {
  /** A text can define its look via defined variants. */
  variant?: 'caption' | 'body' | 'subHeadline' | 'headline' | 'title1' | 'title2' | 'title3' | 'largeTitle' | 'display';
}

export interface TextState extends TextProps {
  ref: React.RefObject<HTMLElement>;
}
