import * as React from 'react';
import { IStyle, ITheme } from '@fluentui/react/lib/Styling';
import { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import { IDropdownStyleProps } from '@fluentui/react/lib/Dropdown';
import { IPackageGroup } from '@fluentui/react-monaco-editor';

export interface IExampleCardProps {
  /** Example title */
  title: string;
  /**
   * Element to render the title as. Now defaults to h3 for accessibility.
   * @default 'h3'
   */
  titleAs?: 'h2' | 'h3' | 'h4' | 'span';
  /** Whether this component is experimental */
  isOptIn?: boolean;
  /** Example code as a string */
  code?: string;
  /** Children to display inside the ExampleCard */
  children?: React.ReactNode;
  /** Whether the example is right aligned */
  isRightAligned?: boolean;
  /** Example dos */
  dos?: JSX.Element;
  /** Example don'ts */
  donts?: JSX.Element;
  /** Whether the example is scrollable */
  isScrollable?: boolean;
  /**
   * JS string used for the example card's "Export to CodePen" button.
   * @deprecated Determining if export to codepen is supported and transforming the example
   * are now handled automatically at runtime.
   */
  codepenJS?: string;

  /** Theme provided by higher-order component. */
  theme?: ITheme;

  /** Optional override styles */
  styles?: IStyleFunctionOrObject<IExampleCardStyleProps, IExampleCardStyles>;

  /** On click handler to ensure only one code editor instance is shown at once */
  onToggleEditor?: (card: string) => void;

  /** Whether code example is visible */
  isCodeVisible?: boolean;

  /**
   * Custom supported packages for the live code editor. Defaults to core Fabric packages plus
   * example-data. If you want to build off the default list of packages, it's exported from
   * `@fluentui/react-monaco-editor/lib/utilities/defaultSupportedPackages`.
   */
  editorSupportedPackages?: IPackageGroup[];
}

export type IExampleCardStyleProps = Pick<IExampleCardProps, 'isRightAligned' | 'isScrollable' | 'theme'> & {
  isCodeVisible?: boolean;
};

export interface IExampleCardStyles {
  root: IStyle;
  header: IStyle;
  title: IStyle;
  toggleButtons: IStyle;
  example: IStyle;
  code: IStyle;
  dosAndDonts: IStyle;
  dos: IStyle;
  donts: IStyle;
  subComponentStyles: IExampleCardSubComponentStyles;
}

export interface IExampleCardSubComponentStyles {
  // TODO: replace with IDropdownStyles after TS 3 upgrade
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dropdowns: IStyleFunctionOrObject<IDropdownStyleProps, any>;
  // TODO: fix once button has full styling support
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  codeButtons: IStyleFunctionOrObject<any, any>;
}
