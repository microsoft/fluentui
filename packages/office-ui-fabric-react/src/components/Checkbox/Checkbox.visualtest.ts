import { Casper } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { defaultScreenshot, mouseMoveScreenshot, mouseDownScreenshot, mouseClickScreenshot } from '../../visualtest/RunVisualTest';
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

function testRunner() {
  componentIds.forEach(element => {
    element.commands.forEach(command => {
      command(element);
    });
  });
}

casper.
  start(baseUrl + 'checkbox').
  then(() => {
    testRunner();
  });

casper.run(() => { casper.test.done(); });
