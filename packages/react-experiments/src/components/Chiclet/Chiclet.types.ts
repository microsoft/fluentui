import * as React from 'react';
import type { IStyleFunctionOrObject, IRefObject } from '../../Utilities';
import type { IStyle, ITheme } from '../../Styling';

export interface IChiclet {}

export interface IChicletProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Optional callback to access the IChiclet interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IChiclet>;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IChicletStyleProps, IChicletStyles>;

  /**
   * Optional class for chiclet.
   */
  className?: string;

  /**
   * Sharing link.
   */
  url: string;

  /**
   * File title to render for the component.
   */
  title: string;

  /**
   * Chiclet size to render
   */
  size?: ChicletSize;

  /**
   * Description to render for the component in place of the url.
   */
  description?: React.ReactElement<JSX.Element>;

  /**
   * Preview to render for the component.
   */
  preview?: React.ReactElement<HTMLElement>;

  /**
   * Image to render for the component.
   */
  image?: string;

  /**
   * Alternate image to render for the component.
   */
  imageAlt?: string;

  /**
   * Icon to render for the component.
   */
  itemType?: 'word' | 'docx' | 'powerpoint' | 'pptx' | 'excel' | 'xlsx';

  /**
   * Function to call when the card is clicked.
   */
  onClick?: (ev?: React.MouseEvent<HTMLElement>) => void;

  /**
   * Footer to render for the component.
   */
  footer?: React.ReactElement<JSX.Element>;

  /**
   * Theme for the component.
   */
  theme?: ITheme;
}

export interface IChicletStyleProps {
  /**
   * Theme for the component.
   */
  theme?: ITheme;
}

export interface IChicletStyles {
  /**
   * Style for the root element when fixed.
   */
  root?: IStyle;
}

export enum ChicletSize {
  /**
   * X-Small Chiclet
   */
  xSmall = 0,

  /**
   * Small Chiclet
   */
  small = 1,

  /**
   * Medium Chiclet
   */
  medium = 2,

  /**
   * Large Chiclet
   */
  large = 3,
}
