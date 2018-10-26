import FluentTheme from '../FluentTheme';
import { getFocusStyle } from '../../../../styling/lib';

export const CommandBarButtonStyles = {
  root: {
    ...getFocusStyle(FluentTheme, 2)
  }
};
