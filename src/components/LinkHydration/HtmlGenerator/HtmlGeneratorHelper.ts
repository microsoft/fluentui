/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file HtmlGeneratorFactory.ts
 */
import { IHTMLEmbedArea } from '../HTMLEmbed.Props';
import { IHtmlGeneratorProps } from './HtmlGenerator';

export default class HtmlGeneratorHelper {
  public static createHTMLElement(htmlGeneratorProps: IHtmlGeneratorProps,
    tagName: string, safeAttributes: string[]): HTMLElement {
      const htmlElement: HTMLElement = HtmlGeneratorHelper._createSafeHTMLElement(
        htmlGeneratorProps.vanillaHtml, tagName, safeAttributes);
      if (htmlElement) {
        htmlElement.setAttribute('tabindex', '-1');
        HtmlGeneratorHelper.moveAreaFromStyle2Attribute(htmlElement);
        const scaledArea: IHTMLEmbedArea = HtmlGeneratorHelper.getScaledDomArea(
          htmlElement, htmlGeneratorProps.htmlEmbedArea, htmlGeneratorProps.shouldScale);
        if (scaledArea && scaledArea.width) {
          htmlElement.setAttribute('width', scaledArea.width.toString());
        }

        if (scaledArea && scaledArea.height) {
          htmlElement.setAttribute('height', scaledArea.height.toString());
        }
      }

      return htmlElement;
  }

  public static createDOMElementFromStr(htmlStr: string, tagName: string): HTMLElement {
      const divElement: HTMLElement = document.createElement('div');
      divElement.innerHTML = htmlStr;
      return (divElement.getElementsByTagName(tagName)[0] as HTMLElement);
  }

  public static getScaledDomArea(originalHTMLElement: HTMLElement, totalArea: IHTMLEmbedArea,
    shouldScale: boolean): IHTMLEmbedArea {
    if (!originalHTMLElement) {
      return undefined;
    }

    const originalArea: IHTMLEmbedArea = {
      width: parseInt(originalHTMLElement.getAttribute('width'), 10),
      height: parseInt(originalHTMLElement.getAttribute('height'), 10)
    };

    if (originalArea.width <= 0 || originalArea.height <= 0
      || isNaN(originalArea.width) || isNaN(originalArea.height)) {
      return undefined;
    }

    // For avoid null check of totalArea
    if (!totalArea || totalArea.width <= 0 || totalArea.height <= 0) {
      totalArea = originalArea;
    }

    const width: number = (originalHTMLElement.getAttribute('width').indexOf('%') === -1) ? originalArea.width :
        totalArea.width * ( originalArea.width / 100 );
    const height: number = (originalHTMLElement.getAttribute('height').indexOf('%') === -1) ? originalArea.height :
        totalArea.height * ( originalArea.height / 100 );

    return {
      width: Math.ceil(!shouldScale ? width : totalArea.width),
      height: Math.ceil(!shouldScale ? height : totalArea.width * (height / width))
    };
  }

  public static moveAreaFromStyle2Attribute(htmlElement: HTMLElement): void {
    HtmlGeneratorHelper._moveWidthOrHeightFromStyle2Attribute(htmlElement, 'width');
    HtmlGeneratorHelper._moveWidthOrHeightFromStyle2Attribute(htmlElement, 'height');
  }

  private static _createSafeHTMLElement(embedHtmlCode: string,
    tagName: string, safeAttributes: string[]): HTMLElement {
    const tmpHtmlElement: HTMLElement = HtmlGeneratorHelper.createDOMElementFromStr(
      embedHtmlCode, tagName);
    if (!tmpHtmlElement) {
      return tmpHtmlElement;
    }

    const shouldDeletedAttributes: string[] = [];
    for (let i: number = 0; i < tmpHtmlElement.attributes.length; i++) {
        const attribute: Attr = tmpHtmlElement.attributes[i];
        let isbelongsToSafeAttribute: boolean = false;
        safeAttributes.forEach((attributeName: string) => {
          if (attribute.name === attributeName.toLowerCase()) {
            isbelongsToSafeAttribute = true;
          }
        });

        if (!isbelongsToSafeAttribute) {
          shouldDeletedAttributes.push(attribute.name);
        }
    }

    shouldDeletedAttributes.map( (attributeName) => {
      tmpHtmlElement.removeAttribute(attributeName);
    });

    tmpHtmlElement.innerHTML = '';
    return tmpHtmlElement;
  }

  private static _moveWidthOrHeightFromStyle2Attribute(htmlElement: HTMLElement, attributeName: string): void {
    if (htmlElement.style && htmlElement.style[attributeName]) {
      const styleValue: string = htmlElement.style[attributeName];
      htmlElement.setAttribute(attributeName, (/em$/i.test(styleValue) ?
          (parseInt(styleValue, 10) * HtmlGeneratorHelper._getEmPxScaleRate()).toString() : styleValue));
      htmlElement.style.removeProperty(attributeName);
    }
  }

  private static _getEmPxScaleRate(): number {
    const emPxScaleDefaultRate: number = 16;
    const bodyElement: HTMLElement = document.getElementsByTagName('body')[0];
    if (!bodyElement) {
      return emPxScaleDefaultRate;
    }

    const fontSize: number = parseInt(window.getComputedStyle(bodyElement, undefined)
        .getPropertyValue('font-size'), 10);
    if (!fontSize) {
      return emPxScaleDefaultRate;
    }

    return fontSize;
  }
}
