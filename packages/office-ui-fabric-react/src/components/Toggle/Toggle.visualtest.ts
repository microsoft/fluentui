import { Casper} from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { defaultScreenshot, testRunner, mouseClickScreenshot, mouseMoveScreenshot, mouseDownScreenshot } from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';
declare var casper: Casper;
let componentIds: IRunVisualTest[] = [];

componentIds.push({
  selector: '.' + 'ms-Toggle-button',
  fileName: 'toggle',
  imageSelector: '.' + 'Toggle',
  commands: [defaultScreenshot, mouseClickScreenshot, mouseMoveScreenshot, mouseDownScreenshot]
});

casper.
  start(baseUrl + 'toggle').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });