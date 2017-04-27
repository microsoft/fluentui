import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { defaultScreenshot, testRunner, mouseClickScreenshot, mouseMoveScreenshot, mouseDownScreenshot } from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';
declare var casper: Casper;
let componentIds: IRunVisualTest[] = [];

componentIds.push({
  selector: '#' + 'TooltipButton',
  fileName: 'tooltip',
  imageSelector: '#' + 'Tooltip',
  commands: [mouseClickScreenshot, mouseMoveScreenshot, mouseDownScreenshot]
});

casper.
  start(baseUrl + 'tooltip').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });