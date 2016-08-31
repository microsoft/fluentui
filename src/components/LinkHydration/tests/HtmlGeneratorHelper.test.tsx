/**
* @copyright (c) Microsoft Corporation. All rights reserved.
*
* @file HTMLGeneratorHelper.test.tsx has all the tests related to HTMLEmbed control
*/

import { expect } from 'chai';
import HtmlGeneratorHelper from '../HtmlGenerator/HtmlGeneratorHelper';
import { IHTMLEmbedArea } from '../HTMLEmbed.Props';

describe('HtmlGeneratorHelper: ', () => {

  it('should create DOMElement successfully', (done: MochaDone) => {
    let iframeDOM: HTMLElement = HtmlGeneratorHelper.createDOMElementFromStr('<iframe>xxxx</iframe>', 'iframe');
    expect(iframeDOM.outerHTML).to.be.contains('<iframe>xx');

    iframeDOM = HtmlGeneratorHelper.createDOMElementFromStr('<div>xxxxxx<iframe>xxxx</iframe>aaaa', 'iframe');
    expect(iframeDOM.outerHTML).to.be.contains('<iframe>xx');
    done();
  });

  it('should create DOMElement failed', (done: MochaDone) => {
    const iframeDOM: HTMLElement = HtmlGeneratorHelper.createDOMElementFromStr('xx<ifra>xxxx</iframe>', 'iframe');
    expect(iframeDOM).to.be.empty;
    done();
  });

  it('should get scaled dom area', (done: MochaDone) => {
    expect(HtmlGeneratorHelper.getScaledDomArea(undefined, undefined, false)).to.be.empty;

    let iframeDOM: HTMLElement = HtmlGeneratorHelper.createDOMElementFromStr(
      'xx<iframe width="500" height="400">xxxx</iframe>', 'iframe');
    let htmlArea: IHTMLEmbedArea = HtmlGeneratorHelper.getScaledDomArea(iframeDOM, undefined, false);
    expect(htmlArea.width).to.be.equals(500);
    expect(htmlArea.height).to.be.equals(400);

    iframeDOM = HtmlGeneratorHelper.createDOMElementFromStr(
      'xx<iframe width="100%" height="400">xxxx</iframe>', 'iframe');
    htmlArea = HtmlGeneratorHelper.getScaledDomArea(iframeDOM, undefined, false);
    expect(htmlArea.width).to.be.equals(100);
    expect(htmlArea.height).to.be.equals(400);

    iframeDOM = HtmlGeneratorHelper.createDOMElementFromStr(
      'xx<iframe width="500%" height="400">xxxx</iframe>', 'iframe');
    htmlArea = HtmlGeneratorHelper.getScaledDomArea(iframeDOM, undefined, true);
    expect(htmlArea.width).to.be.equals(500);
    expect(htmlArea.height).to.be.equals(80);

    iframeDOM = HtmlGeneratorHelper.createDOMElementFromStr(
      'xx<iframe width="500%" height="400">xxxx</iframe>', 'iframe');
    htmlArea = HtmlGeneratorHelper.getScaledDomArea(iframeDOM, { width: 600, height: 300 }, false);
    expect(htmlArea.width).to.be.equals(3000);
    expect(htmlArea.height).to.be.equals(400);

    iframeDOM = HtmlGeneratorHelper.createDOMElementFromStr(
      'xx<iframe width="500%" height="400">xxxx</iframe>', 'iframe');
    htmlArea = HtmlGeneratorHelper.getScaledDomArea(iframeDOM, { width: 600, height: 300 }, true);
    expect(htmlArea.width).to.be.equals(600);
    expect(htmlArea.height).to.be.equals(80);

    iframeDOM = HtmlGeneratorHelper.createDOMElementFromStr(
      'xx<iframe width="80%" height="60%">xxxx</iframe>', 'iframe');
    htmlArea = HtmlGeneratorHelper.getScaledDomArea(iframeDOM, { width: 600, height: 300 }, true);
    expect(htmlArea.width).to.be.equals(600);
    expect(htmlArea.height).to.be.equals(225);

    iframeDOM = HtmlGeneratorHelper.createDOMElementFromStr(
      'xx<iframe width="320" height="240">xxxx</iframe>', 'iframe');
    htmlArea = HtmlGeneratorHelper.getScaledDomArea(iframeDOM, { width: 600, height: 300 }, true);
    expect(htmlArea.width).to.be.equals(600);
    expect(htmlArea.height).to.be.equals(450);

    done();
  });

  it('should move width or height from style to attribute', (done: MochaDone) => {
    let iframeDOM: HTMLElement = HtmlGeneratorHelper.createDOMElementFromStr(
      'xx<iframe width="500" height="400" style="width: 640px; height: 640px;"' +
      ' border: 1px solid #444;">xxxx</iframe>', 'iframe');
    expect(iframeDOM.outerHTML).to.be.contains('style="width: 640px; height: 640px;"');
    HtmlGeneratorHelper.moveAreaFromStyle2Attribute(iframeDOM);
    expect(iframeDOM.getAttribute('width')).to.be.equals('640px');
    expect(iframeDOM.getAttribute('height')).to.be.equals('640px');
    expect(iframeDOM.outerHTML).to.not.be.contains('style="width: 640px; height: 640px;"');

    iframeDOM = HtmlGeneratorHelper.createDOMElementFromStr(
      'xx<iframe width="500" style="width: 640px; height: 16em;" border: 1px solid #444;">xxxx</iframe>', 'iframe');
    expect(iframeDOM.outerHTML).to.be.contains('style="width: 640px; height: 16em;"');
    HtmlGeneratorHelper.moveAreaFromStyle2Attribute(iframeDOM);
    expect(iframeDOM.getAttribute('width')).to.be.equals('640px');
    expect(iframeDOM.getAttribute('height')).to.be.equals('256');
    expect(iframeDOM.outerHTML).to.not.be.contains('style="width: 640px; height: 16em;"');

    iframeDOM = HtmlGeneratorHelper.createDOMElementFromStr(
      'xx<iframe widthx="500" style="width: 600%; height: 16em;" border: 1px solid #444;">xxxx</iframe>', 'iframe');
    expect(iframeDOM.outerHTML).to.be.contains('style="width: 600%; height: 16em;"');
    HtmlGeneratorHelper.moveAreaFromStyle2Attribute(iframeDOM);
    expect(iframeDOM.getAttribute('width')).to.be.equals('600%');
    expect(iframeDOM.getAttribute('height')).to.be.equals('256');
    expect(iframeDOM.outerHTML).to.not.be.contains('style="width: 600%; height: 16em;"');

    done();
  });

});
