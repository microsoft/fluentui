import { Casper} from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { defaultScreenshot, mouseMoveScreenshot, mouseDownScreenshot, mouseClickScreenshot, testRunner } from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';
declare var casper: Casper;

let componentIds: IRunVisualTest[] = [];

componentIds.push({
  selector: '.' + 'ms-Dialog-main',
  fileName: 'dialog',
  commands: [defaultScreenshot, mouseClickScreenshot, mouseDownScreenshot, mouseMoveScreenshot]
});

casper.
  start(baseUrl + 'dialog').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });