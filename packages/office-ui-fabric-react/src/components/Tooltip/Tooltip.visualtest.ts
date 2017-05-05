import { Casper } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { testRunner, mouseMoveScreenshot } from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';
declare var casper: Casper;
let componentIds: IRunVisualTest[] = [];

componentIds.push({
  selector: '#' + 'TooltipButton',
  fileName: 'tooltip',
  imageSelector: '.' + 'ms-Layer',
  commands: [mouseMoveScreenshot]
});

casper.
  start(baseUrl + 'tooltip').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });