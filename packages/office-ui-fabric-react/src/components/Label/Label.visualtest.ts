import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { defaultScreenshot, testRunner } from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';

declare var phantomcss: IPhantomCSS;
declare var casper: Casper;

let componentIds: IRunVisualTest[] = [];

componentIds.push({
  selector: '.' + 'Label',
  fileName: 'label',
  commands: [defaultScreenshot]
});

componentIds.push({
  selector: '.' + 'LabelDisabled',
  fileName: 'disabledLabel',
  commands: [defaultScreenshot]
});
componentIds.push({
  selector: '.' + 'LabelRequired',
  fileName: 'requiredLabel',
  commands: [defaultScreenshot]
});

casper.
  start(baseUrl + 'label').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });