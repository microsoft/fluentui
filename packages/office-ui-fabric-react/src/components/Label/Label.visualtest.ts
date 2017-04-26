import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { defaultScreenshot, mouseMoveScreenshot, mouseDownScreenshot, mouseClickScreenshot, testRunner } from '../../visualtest/RunVisualTest';
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
  selector: '.' + 'DisabledLabel',
  fileName: 'disabledLabel',
  commands: [defaultScreenshot]
});
componentIds.push({
  selector: '.' + 'RequiredLabel',
  fileName: 'requiredLabel',
  commands: [defaultScreenshot]
});

casper.
  start(baseUrl + 'label').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });