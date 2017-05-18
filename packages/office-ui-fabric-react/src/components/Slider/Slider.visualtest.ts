import { Casper } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { defaultScreenshot, testRunner } from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';
declare var casper: Casper;
let componentIds: IRunVisualTest[] = [];

componentIds.push({
  selector: '.' + 'ms-Slider',
  fileName: 'slider',
  commands: [defaultScreenshot]
});

casper.
  start(baseUrl + 'slider').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });