/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file ImageGenerator.tsx
 */
/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import HtmlGenerator, { IHtmlGeneratorProps } from './HtmlGenerator';
import { IValidateResult } from '../HtmlValidator/HtmlValidator';

export class ImageGenerator extends HtmlGenerator {

  constructor(htmlGeneratorProps: IHtmlGeneratorProps) {
    super(htmlGeneratorProps);
  }

  public createHtmlElement(): JSX.Element {
    return (
      <img
        src={ this._htmlGeneratorProps.metadata.Thumbnail }
        width={ this.getWidth() }
        height={ this.getHeight() }
      />);
  }

  public getFilteredVanillaHtml(): string {
    return '';
  }

  public isValidImp(vanillaHtml: string): Promise<IValidateResult> {
    if (this._htmlGeneratorProps.metadata
      && this._htmlGeneratorProps.metadata.Thumbnail
      && this._htmlGeneratorProps.metadata.ThumbnailWidth
      && this._htmlGeneratorProps.metadata.ThumbnailHeight) {
      return Promise.resolve({ isValid: true, errorMessage: '' });
    }
    return Promise.resolve({ isValid: false, errorMessage: this._htmlGeneratorProps.stringsLoc.IllegalRenderImg });
  }

  protected getWidth(): number {
    if (this._htmlGeneratorProps.shouldScale && this._htmlGeneratorProps.htmlEmbedArea.width) {
      return this._htmlGeneratorProps.htmlEmbedArea.width;
    }

    return this._htmlGeneratorProps.metadata.ThumbnailWidth;
  }

  protected getHeight(): number {
    if (this._htmlGeneratorProps.shouldScale && this._htmlGeneratorProps.htmlEmbedArea.height) {
      return this._htmlGeneratorProps.htmlEmbedArea.height;
    }

    return this._htmlGeneratorProps.metadata.ThumbnailHeight;
  }
}

export default ImageGenerator;
