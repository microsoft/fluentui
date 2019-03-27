import { FormattedCheckResult, ICheckConfiguration } from './iruleresults';

export class CheckMessageTransformer {
  public addMessagesToChecks(checks: FormattedCheckResult[], checkConfigurations: ICheckConfiguration[]): void {
    for (let checkIndex = 0; checkIndex < checks.length; checkIndex++) {
      const checkResult = checks[checkIndex];
      const checkConfig = checkConfigurations.filter(config => config.id === checkResult.id).pop();

      if (checkConfig === undefined) {
        continue;
      }

      if (checkResult.result) {
        checkResult.message = checkConfig.passMessage ? checkConfig.passMessage() : checkResult.message;
      } else {
        checkResult.message = checkConfig.failMessage ? checkConfig.failMessage() : checkResult.message;
      }
    }
  }
}
