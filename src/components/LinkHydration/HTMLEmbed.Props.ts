/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file HTMLEmbed.Props.ts
 */

import IEmbeddableService from './EmbeddableService/IEmbeddableService';
import HtmlValidator from './HtmlValidator/HtmlValidator';

export enum EmbedCodeType {
  Url,
  VanillaHtml
}

export enum EmbedCodeShownType {
  BingPreviewStyle,
  ContentStyle
}

export interface IEmbedCode {
  embedCode: string;
  embedCodeType: EmbedCodeType;
  embedCodeShownType?: EmbedCodeShownType;
}

// unit is px
export interface IHTMLEmbedArea {
  width: number;
  height: number;
}

export interface IStringsLoc {
  useIframeTag: string;
  useHTTPS: string;
  IllegalRenderIframe: string;
  IllegalRenderImg: string;
  htmlEmbedBoundingAreaZero: string;
  htmlEmbedWebPartAriaLabel: string;
  noSettingEmbedableService: string;
  unsupportedEmbedUrl: string;
}

/**
 * @export
 * @interface IHTMLEmbedProps
 */
export interface IHTMLEmbedProps {
  embedCode: IEmbedCode;
  stringsLoc: IStringsLoc;
  shouldScale?: boolean;
  // If don't set this props, it means need validate
  noNeedValidate?: boolean;
  htmlValidator?: HtmlValidator;
  embeddableService?: IEmbeddableService;
  renderError?: (errorMessage: string) => JSX.Element;
  renderLoadingIndicator?: () => JSX.Element;
  boundingArea?: IHTMLEmbedArea;
}
