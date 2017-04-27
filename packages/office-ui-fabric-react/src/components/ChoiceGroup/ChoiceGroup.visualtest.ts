import { Casper } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { defaultScreenshot, mouseMoveScreenshot, mouseDownScreenshot, mouseClickScreenshot, testRunner } from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';

declare var casper: Casper;

let componentIds: IRunVisualTest[] = [];

componentIds.push({
  selector: '.' + 'ms-ChoiceField-field',
  fileName: 'choiceGroup',
  imageSelector: '.' + 'ChoiceGroup',
  commands: [defaultScreenshot, mouseMoveScreenshot, mouseDownScreenshot, mouseClickScreenshot]
});

componentIds.push({
  selector: '.' + 'ms-ChoiceField-field',
  fileName: 'choiceGroupDisabled',
  imageSelector: '.' + 'ChoiceGroup',
  commands: [defaultScreenshot]
});

componentIds.push({
  selector: '.' + 'ms-ChoiceField',
  fileName: 'choiceGroupIcon',
  imageSelector: '.' + 'ChoiceGroupIcon',
  commands: [defaultScreenshot, mouseMoveScreenshot, mouseDownScreenshot, mouseClickScreenshot]
});

casper.
  start(baseUrl + 'choiceGroup').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });