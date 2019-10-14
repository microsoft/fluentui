import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { IDropdownStyleProps } from 'office-ui-fabric-react/lib/Dropdown';

export interface IExampleCardProps {
  /** Example title */
  title: string;
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
  // tslint:disable-next-line:no-any
  dropdowns: IStyleFunctionOrObject<IDropdownStyleProps, any>;
  // TODO: fix once button has full styling support
  // tslint:disable-next-line:no-any
  codeButtons: IStyleFunctionOrObject<any, any>;
}
