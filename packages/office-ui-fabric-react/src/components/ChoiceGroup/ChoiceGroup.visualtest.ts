import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { defaultScreenshot, mouseMoveScreenshot, mouseDownScreenshot, mouseClickScreenshot, testRunner } from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';

declare var phantomcss: IPhantomCSS;
declare var casper: Casper;

let componentIds: IRunVisualTest[] = [];

componentIds.push({
  selector: '.' + 'ChoiceGroup',
  fileName: 'choiceGroup',
  commands: [defaultScreenshot, mouseClickScreenshot, mouseDownScreenshot, mouseMoveScreenshot]

});

componentIds.push({
  selector: '.' + 'ChoiceGroupDisabled',
  fileName: 'choiceGroupDisabled',
  commands: [defaultScreenshot]

});

componentIds.push({
  selector: '.' + 'ChoiceGroupIcon',
  fileName: 'choiceGroupIcon',
  commands: [defaultScreenshot, mouseClickScreenshot, mouseDownScreenshot, mouseMoveScreenshot]

});

casper.
  start(baseUrl + 'choiceGroup').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });