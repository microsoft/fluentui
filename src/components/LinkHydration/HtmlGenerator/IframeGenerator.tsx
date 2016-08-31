/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file IframeGenerator.ts
 */
/* tslint:disable */
import * as React from 'react';
/* tslint:enable */

import HtmlGenerator, { IHtmlGeneratorProps } from './HtmlGenerator';
import HtmlGeneratorHelper from './HtmlGeneratorHelper';
import { IValidateResult } from '../HtmlValidator/HtmlValidator';

export class IframeGenerator extends HtmlGenerator {

  private static _tagName: string = 'iframe';
  private static _safeAttributes: string[] = ['align', 'frameborder', 'height', 'longdesc', 'marginheight',
    'marginwidth', 'name', 'scrolling', 'src', 'srcdoc', 'width', 'allowfullscreen', 'class', 'style'];
  private static _bingVideoSRCTemplate: string = 'https://www.bing.com/videos/search?view=detail&mmscn=owanorv&mid=';
  private _htmlElement: HTMLElement;

  constructor(htmlGeneratorProps: IHtmlGeneratorProps) {
    super(htmlGeneratorProps);
    if (htmlGeneratorProps.vanillaHtml) {
      this._htmlElement = HtmlGeneratorHelper.createHTMLElement(htmlGeneratorProps,
        IframeGenerator._tagName, IframeGenerator._safeAttributes);
      if (this._htmlElement && !this._htmlElement.getAttribute('allowfullscreen')) {
        this._htmlElement.setAttribute('allowfullscreen', '');
      }

      // Use Bing video src as high priority one.
      if (this._htmlElement && this._htmlGeneratorProps.metadata && this._htmlGeneratorProps.metadata.VideoId) {
        this._htmlElement.setAttribute('src',
          IframeGenerator._bingVideoSRCTemplate + this._htmlGeneratorProps.metadata.VideoId);
      }
    }
  }

  public createHtmlElement(): JSX.Element {
    return (<div dangerouslySetInnerHTML={{__html: this.getFilteredVanillaHtml()}} />);
  }

  public getFilteredVanillaHtml(): string {
    if (!this._htmlElement) {
      return '';
    }

    return this._htmlElement.outerHTML;
  }

  public isValidImp(vanillaHtml: string): Promise<IValidateResult> {
    const iframeElement: HTMLElement = HtmlGeneratorHelper.createDOMElementFromStr(
      vanillaHtml, IframeGenerator._tagName);
    if (!iframeElement) {
      return Promise.reject({ isValid: false, errorMessage: this._htmlGeneratorProps.stringsLoc.useIframeTag });
    }

    const srcProtocolRegExp: RegExp = this._getLocationOrigin().indexOf('http://') === 0 ?
        /^http:\/\/|^\/\/|^https:\/\//i : /^https:\/\/|^\/\//i;
    const widthAndHeightRegExp: RegExp = /^[0-9]+/i;
    const isValidSrc: boolean = srcProtocolRegExp.test(iframeElement.getAttribute('src'));
    const isValidWidth: boolean = (parseInt(iframeElement.getAttribute('width'), 10) &&
      widthAndHeightRegExp.test(iframeElement.getAttribute('width')));
    const isValidHeight: boolean = (parseInt(iframeElement.getAttribute('height'), 10) &&
      widthAndHeightRegExp.test(iframeElement.getAttribute('height')));

    if (isValidSrc && isValidWidth && isValidHeight) {
        return Promise.resolve({ isValid: true, errorMessage: '' });
    }

    const isStartWithHttp: boolean = /^http:\/\//i.test(iframeElement.getAttribute('src'));
    if (isStartWithHttp && isValidWidth && isValidHeight) {
      return Promise.reject({ isValid: false, errorMessage: this._htmlGeneratorProps.stringsLoc.useHTTPS });
    }

    return Promise.reject({ isValid: false, errorMessage: this._htmlGeneratorProps.stringsLoc.IllegalRenderIframe });
  }

  protected getWidth(): number {
    return parseInt(this._htmlElement.getAttribute('width'), 10);
  }

  protected getHeight(): number {
    return parseInt(this._htmlElement.getAttribute('height'), 10);
  }

  private _getLocationOrigin(): string {
    return location.origin;
  }

}

export default IframeGenerator;
