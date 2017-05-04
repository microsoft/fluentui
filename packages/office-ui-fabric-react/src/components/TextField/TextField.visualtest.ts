import { Casper } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { defaultScreenshot, testRunner, mouseClickScreenshot, mouseMoveScreenshot, mouseDownScreenshot } from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';
declare var casper: Casper;
let componentIds: IRunVisualTest[] = [];

componentIds.push({
  selector: '.' + 'TextField',
  fileName: 'textField',
  commands: [defaultScreenshot, mouseClickScreenshot, mouseMoveScreenshot, mouseDownScreenshot]
});

componentIds.push({
  selector: '.' + 'TextFieldIcon',
  fileName: 'textFieldIcon',
  commands: [defaultScreenshot, mouseClickScreenshot, mouseMoveScreenshot, mouseDownScreenshot]
});

casper.
  start(baseUrl + 'textField').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });