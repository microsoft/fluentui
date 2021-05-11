import { IStyle, ITheme } from '@fluentui/react/lib/Styling';
import { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import { IDetailsListStyleProps } from '@fluentui/react/lib/DetailsList';

export interface IPropertiesTableSetProps {
  /**
   * Component name. Assumes component resides in `components/[name]` folder
   * and properties are at `components/[name]/[name].types.ts`.
   */
  componentName?: string;

  /**
   * If provided, overrides componentName usage to derive the path to the props.
   * Example: `utilities/focus/`
   */
  componentPath?: string;

  /**
   * If specified, will only render interfaces and enums specified here.
   */
  renderOnly?: string[];

  /**
   * A set of pre-resolved source code.
   */
  sources?: string[];

  /** Theme provided by higher-order component. */
  theme?: ITheme;

  /** Optional override styles */
  styles?: IStyleFunctionOrObject<IPropertiesTableSetStyleProps, IPropertiesTableSetStyles>;
}

export type IPropertiesTableSetStyleProps = Pick<IPropertiesTableSetProps, 'theme'>;

export interface IPropertiesTableSetStyles {
  /** Styles for the root of each properties table */
  tableRoot: IStyle;
  /** Styles for each table header */
  tableHeader: IStyle;
  subComponentStyles: IPropertiesTableSetSubComponentStyles;
}

export interface IPropertiesTableSetSubComponentStyles {
  // TODO: remove anys after TS 3 upgrade
  /* eslint-disable @typescript-eslint/no-explicit-any */
  list: IStyleFunctionOrObject<IDetailsListStyleProps, any>;
}
