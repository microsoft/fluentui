import { SizeValue } from '@fluentui/react-northstar';
import { IComponentProps } from '../temp/IComponentProps';
import { IShorthandValue } from '../temp/IShorthandValue';

// tslint:disable-next-line:no-any
export interface IStatusProps extends IComponentProps<IStatusProps>, React.HTMLAttributes<any> {
  // Removing these props:
  // accessibility - no need
  /**
   * Renders the status using a custom color to be inlined using  `style`.
   * Note: May want to deprecate in favor of variables.
   */
  color?: string;
  /**
   * Shorthand icon. A shorthand prop can be a literal, object,
   * JSX, or function which takes render options.
   */
  icon?: IShorthandValue<{}>;
  /**
   * Size multiplier.
   */
  size?: SizeValue;

  /** The pre-defined state values which can be consumed directly. */
  state?: 'success' | 'info' | 'warning' | 'error' | 'unknown';

  classes?: Partial<{
    root: string;
    icon: string;
  }>;

  slots?: Partial<{
    root: React.ElementType;
    icon: React.ElementType;
  }>;

  slotProps?: Partial<{
    root: any;
    icon: any;
  }>;
}
