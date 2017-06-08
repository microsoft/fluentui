/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file HTMLValidator.ts
 */
import HtmlValidator, { IValidateResult } from './HtmlValidator';

export class MockHtmlValidator extends HtmlValidator {
  public static errorFlagStr: string = 'makeIsvalidReturnError';
  public static errorMessage: string = 'MockValidatorError';

  public isValidImp(vanillaHtml: string): Promise<IValidateResult> {
    if (vanillaHtml.indexOf(MockHtmlValidator.errorFlagStr) !== -1) {
      return Promise.reject({ isValid: false, errorMessage: MockHtmlValidator.errorMessage });
    }

    return Promise.resolve({ isValid: true, errorMessage: '' });
  }

}

export default MockHtmlValidator;
