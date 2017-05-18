import { Casper } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { defaultScreenshot, testRunner } from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';
declare var casper: Casper;
let componentIds: IRunVisualTest[] = [];

componentIds.push({
  selector: '.' + 'ms-Dialog-main',
  fileName: 'modal',
  commands: [defaultScreenshot]
});

casper.
  start(baseUrl + 'modal').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });