import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { defaultScreenshot, testRunner, mouseClickScreenshot, mouseMoveScreenshot, mouseDownScreenshot } from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';

declare var phantomcss: IPhantomCSS;
declare var casper: Casper;

let componentIds: IRunVisualTest[] = [];

componentIds.push({
  selector: '.' + 'Toggle',
  fileName: 'toggle',
  commands: [defaultScreenshot, mouseClickScreenshot, mouseMoveScreenshot, mouseDownScreenshot]
});

casper.
  start(baseUrl + 'toggle').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });