import { Casper } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { defaultScreenshot, testRunner } from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';
declare var casper: Casper;
let componentIds: IRunVisualTest[] = [];

componentIds.push({
  selector: '.' + 'Label',
  fileName: 'label',
  commands: [defaultScreenshot]
});

componentIds.push({
  selector: '.' + 'LabelDisabled',
  fileName: 'labelDisabled',
  commands: [defaultScreenshot]
});
componentIds.push({
  selector: '.' + 'LabelRequired',
  fileName: 'labelRequired',
  commands: [defaultScreenshot]
});

casper.
  start(baseUrl + 'label').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });