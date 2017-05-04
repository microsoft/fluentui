import { Casper } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { defaultScreenshot, testRunner } from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';
declare var casper: Casper;
let componentIds: IRunVisualTest[] = [];

componentIds.push({
  selector: '.' + 'SpinnerExtraSmall',
  fileName: 'spinnerExtraSmall',
  commands: [defaultScreenshot]
});

componentIds.push({
  selector: '.' + 'SpinnerSmall',
  fileName: 'spinnerSmall',
  commands: [defaultScreenshot]
});
componentIds.push({
  selector: '.' + 'SpinnerMedium',
  fileName: 'spinnerMedium',
  commands: [defaultScreenshot]
});
componentIds.push({
  selector: '.' + 'SpinnerLarge',
  fileName: 'spinnerLarge',
  commands: [defaultScreenshot]
});

casper.
  start(baseUrl + 'spinner').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });