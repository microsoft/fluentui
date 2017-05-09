import { Casper } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { testRunner, defaultScreenshot, mouseClickScreenshot, mouseMoveScreenshot, mouseDownScreenshot } from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';
declare var casper: Casper;
let componentIds: IRunVisualTest[] = [];

componentIds.push({
  fileName: 'link',
  selector: '.' + 'myLink',
  commands: [defaultScreenshot, mouseMoveScreenshot, mouseDownScreenshot]
});

componentIds.push({
  fileName: 'linkDisabled',
  selector: '.' + 'myLinkDisabled',
  commands: [defaultScreenshot]
});

casper.
  start(baseUrl + 'link').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });