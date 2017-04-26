import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import {
  defaultScreenshot, mouseMoveScreenshot, mouseDownScreenshot,
  mouseClickScreenshot, testRunner
} from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';

declare var phantomcss: IPhantomCSS;
declare var casper: Casper;

let componentIds: IRunVisualTest[] = [];

componentIds.push({
  selector: '#' + 'DefaultButton',
  fileName: 'defaultButton',
  commands: [defaultScreenshot, mouseClickScreenshot, mouseDownScreenshot, mouseMoveScreenshot]
});
componentIds.push({
  selector: '#' + 'DefaultButtonDisabled',
  fileName: 'defaultButtonDisabled',
  commands: [defaultScreenshot]
});

casper.
  start(baseUrl + 'defaultButton').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });