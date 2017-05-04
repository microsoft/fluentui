import { Casper } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { defaultScreenshot, testRunner, mouseClickScreenshot, mouseMoveScreenshot, mouseDownScreenshot } from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';
declare var casper: Casper;
let componentIds: IRunVisualTest[] = [];

componentIds.push({
  selector: '.' + 'SearchBox',
  fileName: 'searchBox',
  commands: [defaultScreenshot]
});

casper.
  start(baseUrl + 'searchBox').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });