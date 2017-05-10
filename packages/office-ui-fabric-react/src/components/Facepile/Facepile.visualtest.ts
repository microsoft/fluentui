import { Casper } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { defaultScreenshot, testRunner } from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';
declare var casper: Casper;
let componentIds: IRunVisualTest[] = [];

componentIds.push({
  selector: '.' + 'Facepile',
  fileName: 'facepile',
  commands: [defaultScreenshot]
});

casper.
  start(baseUrl + 'facepile').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });