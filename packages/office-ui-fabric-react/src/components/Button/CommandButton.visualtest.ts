import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import {
  defaultScreenshot, mouseMoveScreenshot,
  mouseDownScreenshot, mouseClickScreenshot, testRunner
} from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';

declare var phantomcss: IPhantomCSS;
declare var casper: Casper;

let componentIds: IRunVisualTest[] = [];

componentIds.push({
  selector: '#' + 'CommandButton',
  fileName: 'commandButton',
  commands: [defaultScreenshot, mouseDownScreenshot, mouseMoveScreenshot, mouseClickScreenshot]
});

componentIds.push({
  selector: '#' + 'CommandButtonDisabled',
  fileName: 'commandButtonDisabled',
  commands: [defaultScreenshot]
});

casper.
  start(baseUrl + 'commandButton').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });
