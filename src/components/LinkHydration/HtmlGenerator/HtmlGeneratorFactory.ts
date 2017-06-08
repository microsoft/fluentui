/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file HtmlGeneratorFactory.ts
 */
import HtmlGenerator, { IHtmlGeneratorProps } from './HtmlGenerator';
import { IframeGenerator } from './IframeGenerator';
import { ImageGenerator } from './ImageGenerator';
import { BingPreviewStyleGenerator } from './BingPreviewStyleGenerator';
import { EmbedCodeShownType } from '../HTMLEmbed.Props';

export default class HtmlGeneratorFactory {
  public static createHtmlGenerator(htmlGeneratorProps: IHtmlGeneratorProps): HtmlGenerator {
    if (htmlGeneratorProps.embedCodeShownType === EmbedCodeShownType.BingPreviewStyle) {
      return (new BingPreviewStyleGenerator(htmlGeneratorProps));
    }

    if (!htmlGeneratorProps.type) {
      return HtmlGeneratorFactory.createHtmlGeneratorWithoutType(htmlGeneratorProps);
    }

    switch (htmlGeneratorProps.type) {
      case HtmlGenerator.photoType:
        return (new ImageGenerator(htmlGeneratorProps));
      default:
        return (new IframeGenerator(htmlGeneratorProps));
    }
  }

  private static createHtmlGeneratorWithoutType(htmlGeneratorProps: IHtmlGeneratorProps): HtmlGenerator {
    return new IframeGenerator(htmlGeneratorProps);
  }

}
