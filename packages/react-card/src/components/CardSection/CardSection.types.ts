import * as React from 'react';
import { ComponentPropsCompat } from '@fluentui/react-utilities';

export type CardSectionProps = ComponentPropsCompat &
  React.HTMLAttributes<HTMLDivElement> & {
    /** A card section can be fitted, without any space above or below it. */
    fitted?: boolean;
  };

export interface CardSectionState extends CardSectionProps {
  ref: React.RefObject<HTMLElement>;
}
