import * as React from 'react';
import { IRefObject, IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { ITheme, IStyle } from 'office-ui-fabric-react/lib/Styling';

/** @deprecated Not used */
export interface IEditSection {}

export interface IEditSectionProps {
  /** @deprecated Not used */
  componentRef?: IRefObject<IEditSection>;

  /** Optional className for the root element. */
  className?: string;

  /**
   * The name of the component
   */
  title: string;

  /**
   * The section name this button is used to edit.
   */
  section: string;

  /** @deprecated Not used */
  sectionContent?: React.ReactNode;

  /** @deprecated Not used */
  readableSection?: string;

  /**
   * Link to edit the markdown page on GitHub.
   */
  url: string;

  /** Theme provided by higher-order component. */
  theme?: ITheme;

  /** Optional override styles */
  styles?: IStyleFunctionOrObject<IEditSectionStyleProps, IEditSectionStyles>;
}

export type IEditSectionStyleProps = Pick<IEditSectionProps, 'theme'>;

export interface IEditSectionStyles {
  root: IStyle;
  subComponentStyles: IEditSectionSubComponentStyles;
}

export interface IEditSectionSubComponentStyles {
  // TODO: remove anys after TS 3 upgrade and full button styling support
  // tslint:disable-next-line:no-any
  button: IStyleFunctionOrObject<any, any>;
}
