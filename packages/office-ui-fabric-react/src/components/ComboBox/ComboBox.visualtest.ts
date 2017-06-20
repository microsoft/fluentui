import { Casper } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { defaultScreenshot, testRunner, mouseClickScreenshot, mouseMoveScreenshot } from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';
declare var casper: Casper;
let componentIds: IRunVisualTest[] = [];

componentIds.push(
  {
    selector: '.' + 'ms-ComboBox-Input',
    fileName: 'comboBox_input',
    imageSelector: '.' + 'ms-ComboBox-Container',
    commands: [defaultScreenshot, mouseClickScreenshot, mouseMoveScreenshot]
  },
  {
    selector: '.' + 'ms-ComboBox-Button',
    fileName: 'comboBox_button',
    imageSelector: '.' + 'ms-comboBox-Container',
    commands: [defaultScreenshot, mouseClickScreenshot, mouseMoveScreenshot]
  },
);

casper.
  start(baseUrl + 'comboBox').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });