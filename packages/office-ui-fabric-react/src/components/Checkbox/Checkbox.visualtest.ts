import { Casper } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { defaultScreenshot, mouseMoveScreenshot, mouseDownScreenshot, mouseClickScreenshot, testRunner } from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';

declare var casper: Casper;

let componentIds: IRunVisualTest[] = [];

componentIds.push({
  selector: '.' + 'ms-Checkbox-input',
  fileName: 'checkbox',
  imageSelector: '.' + 'Checkbox',
  commands: [defaultScreenshot, mouseClickScreenshot, mouseMoveScreenshot, mouseDownScreenshot]
});

componentIds.push({
  selector: '.' + 'CheckboxDisabled',
  fileName: 'checkboxDisabled',
  commands: [defaultScreenshot]
});

casper.
  start(baseUrl + 'checkbox').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });
