import * as React from 'react';
import { Chiclet } from './Chiclet';
import { ChicletPreview } from './ChicletPreview';
import { IStyle, ITheme } from '../../Styling';
import { IStyleFunction } from '../../Utilities';
import { ImageFit } from '../../Image';
import { IIconProps } from '../../Icon';
import { IDocumentCardPreviewProps, IDocumentCardPreviewImage } from '../DocumentCard/DocumentCard.types';

export interface IChiclet {

}

export interface IChicletStyles {
  /**
   * Style for the root element.
   */
  root: IStyle;
}

export interface IChicletProps extends React.Props<Chiclet> {
  /**
   * Optional callback to access the IChiclet interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IChiclet | null) => void;

  /**
   * Optional class for chiclet.
   */
  className?: string;
}

export interface IChicletPreviewProps extends React.Props<ChicletPreview> {
  /**
   * Gets the component ref.
   */
  componentRef?: () => void;

  /**
   * One or more preview images to display.
   */
  previewImages: IDocumentCardPreviewImage[];

  /**
   * The function return string that will describe the number of overflow documents.
   * such as  (overflowCount: number) => `+${ overflowCount } more`,
   */
  getOverflowDocumentCountText?: (overflowCount: number) => string;
}

export interface IChicletPreviewImage extends IDocumentCardPreviewImage {

}