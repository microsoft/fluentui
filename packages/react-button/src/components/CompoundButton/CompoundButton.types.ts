import { ShorthandProps } from '@fluentui/react-compose/lib/next/index';
import { ButtonProps } from '../Button/Button.types';

export interface CompoundButtonProps extends ButtonProps {
  /**
   * Second line of text that describes the action this button takes.
   */
  secondaryContent?: ShorthandProps;

  /**
   * Container that wraps the children and secondaryContent slots.
   */
  contentContainer?: ShorthandProps;
}

export interface CompoundButtonState extends CompoundButtonProps {}
