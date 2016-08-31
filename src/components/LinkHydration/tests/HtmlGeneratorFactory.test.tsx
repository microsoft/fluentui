/**
* @copyright (c) Microsoft Corporation. All rights reserved.
*
* @file HTMLGeneratorFactory.test.tsx has all the tests related to HTMLEmbed control
*/

import { expect } from 'chai';
import HtmlGeneratorFactory from '../HtmlGenerator/HtmlGeneratorFactory';
import HtmlGenerator from '../HtmlGenerator/HtmlGenerator';
import IframeGenerator from '../HtmlGenerator/IframeGenerator';
import ImageGenerator from '../HtmlGenerator/ImageGenerator';
import BingPreviewStyleGenerator from '../HtmlGenerator/BingPreviewStyleGenerator';
import { EmbedCodeShownType, IStringsLoc } from '../HTMLEmbed.Props';

describe('HtmlGeneratorFactory: ', () => {
  const stringsLoc: IStringsLoc = {
    useIframeTag: 'x',
    useHTTPS: 'x',
    IllegalRenderIframe: 'xx',
    IllegalRenderImg: 'x',
    htmlEmbedBoundingAreaZero: 'x',
    htmlEmbedWebPartAriaLabel: 'x',
    noSettingEmbedableService: 'xxxxx',
    unsupportedEmbedUrl: 'x'
  };

  it('should createHtmlGenerator successfully', () => {
    expect(HtmlGeneratorFactory.createHtmlGenerator( {
      vanillaHtml: '<iframe>',
      type: HtmlGenerator.richType,
      stringsLoc: stringsLoc
      }) instanceof IframeGenerator).to.be.true;
    expect(HtmlGeneratorFactory.createHtmlGenerator( {
      vanillaHtml: '<iframe>',
      type: HtmlGenerator.videoType,
      stringsLoc: stringsLoc
      }) instanceof IframeGenerator).to.be.true;
    expect(HtmlGeneratorFactory.createHtmlGenerator( {
      vanillaHtml: '<iframe>',
      type: HtmlGenerator.photoType,
      stringsLoc: stringsLoc
      }) instanceof ImageGenerator).to.be.true;
    expect(HtmlGeneratorFactory.createHtmlGenerator( {
      vanillaHtml: '<iframe>',
      type: HtmlGenerator.unknownType,
      stringsLoc: stringsLoc
      }) instanceof IframeGenerator).to.be.true;
    expect(HtmlGeneratorFactory.createHtmlGenerator( {
      vanillaHtml: '<iframe>',
      stringsLoc: stringsLoc
      }) instanceof IframeGenerator).to.be.true;
    expect(HtmlGeneratorFactory.createHtmlGenerator( {
      embedCodeShownType: EmbedCodeShownType.BingPreviewStyle,
      stringsLoc: stringsLoc
      }) instanceof BingPreviewStyleGenerator).to.be.true;
  });

});
