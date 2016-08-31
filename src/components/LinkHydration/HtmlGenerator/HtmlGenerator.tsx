/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file HtmlGenerator.ts
 */

import * as React from 'react';

import HtmlValidator from '../HtmlValidator/HtmlValidator';
import { IEmbeddableUrlMetadata} from '../EmbeddableService/IEmbeddableService';
import { EmbedCodeShownType, IHTMLEmbedArea, IStringsLoc } from '../HTMLEmbed.Props';

export interface IHtmlGeneratorProps {
  stringsLoc: IStringsLoc;
  vanillaHtml?: string;
  originalUrl?: string;
  metadata?: IEmbeddableUrlMetadata;
  htmlEmbedArea?: IHTMLEmbedArea;
  type?: string;
  shouldScale?: boolean;
  embedCodeShownType?: EmbedCodeShownType;
}

export abstract class HtmlGenerator extends HtmlValidator {
  public static photoType: string = 'photo';
  public static videoType: string = 'video';
  public static linkType: string = 'link';
  public static richType: string = 'rich';
  public static unknownType: string = 'unknown';

  protected _htmlGeneratorProps: IHtmlGeneratorProps;

  constructor(htmlGeneratorProps: IHtmlGeneratorProps) {
    super();
    this._htmlGeneratorProps = htmlGeneratorProps;
  }

  public abstract createHtmlElement(): JSX.Element;
  public abstract getFilteredVanillaHtml(): string;

  public getMaxWidthStyle(): React.CSSProperties {
    return {maxWidth: this.getWidth()};
  }

  public getPaddingBottomStyle(): React.CSSProperties {
    const width: number = this.getWidth();
    const height: number = this.getHeight();
    const ratio: number = width ? height / width : 0;
    return { paddingBottom: ratio * 100 + '%'};
  }

  protected abstract getWidth(): number;

  protected abstract getHeight(): number;
}

export default HtmlGenerator;
