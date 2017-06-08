/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file MockEmbeddableService.ts
 */

import IEmbeddableService, {
  IEmbedServiceResult,
  EmbedServiceResponseCode } from './IEmbeddableService';
import HtmlGenerator from '..//HtmlGenerator/HtmlGenerator';

export class MockEmbeddableService extends IEmbeddableService {
  public static errorFlagStr: string = 'makeGetEmbeddablehtmlcodeReturnError';
  public static errorMessage: string = 'MockEmbeddableServiceError';
  public static startMockURL: string = 'https://MockStartURL';

  public getEmbeddableHtmlCode(): Promise<IEmbedServiceResult> {
    if (this._url.indexOf(MockEmbeddableService.errorFlagStr) !== -1) {
      return Promise.resolve({
        Html: '',
        Type: HtmlGenerator.videoType,
        ErrorMessage: MockEmbeddableService.errorMessage,
        ResponseCode: EmbedServiceResponseCode.GetEmbedCodeError
      });
    }

    return Promise.resolve({
      Html: '<iframe src="https://xxx" width=500 height=300></iframe>',
      Type: HtmlGenerator.videoType,
      ErrorMessage: '',
      ResponseCode: EmbedServiceResponseCode.OK
    });
  }
}

export default MockEmbeddableService;
