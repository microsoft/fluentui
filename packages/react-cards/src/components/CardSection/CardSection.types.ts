import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utilities';
import { ColorTokenSet } from '@fluentui/react-theme-provider/lib/compat/index';

export type CardSectionProps = ComponentProps &
  React.HTMLAttributes<HTMLDivElement> & {
    /** A card section can be fitted, without any space above or below it. */
    fitted?: boolean;
  };

export interface CardSectionState extends CardSectionProps {
  ref: React.RefObject<HTMLElement>;
}

export type CardSectionTokens = ColorTokenSet & {};
