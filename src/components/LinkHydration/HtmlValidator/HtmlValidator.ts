/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file HTMLValidator.ts
 */

export interface IValidateResult {
  isValid: boolean;
  errorMessage?: string;
}

export abstract class HtmlValidator {
  private _successorValidator: HtmlValidator;

  public isValid(vanillaHtml: string): Promise<IValidateResult> {
    return this.isValidImp(vanillaHtml).then((validateResult: IValidateResult) => {
      if (!validateResult.isValid && this._successorValidator) {
        return this._successorValidator.isValidImp(vanillaHtml);
      }
      return validateResult;
    });
  }

  public abstract isValidImp(vanillaHtml: string): Promise<IValidateResult>;

  public setSuccessorValidator(successorValidator: HtmlValidator): void {
    this._successorValidator = successorValidator;
  }

}

export default HtmlValidator;
