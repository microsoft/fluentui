import { Casper } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { testRunner, defaultScreenshot } from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';
declare var casper: Casper;
let componentIds: IRunVisualTest[] = [];

componentIds.push({
  fileName: 'messageBarInfo',
  selector: '.' + 'MessageBarInfo',
  commands: [defaultScreenshot]
});
componentIds.push({
  fileName: 'messageBarError',
  selector: '.' + 'MessageBarError',
  commands: [defaultScreenshot]
});
componentIds.push({
  fileName: 'messageBarWarning',
  selector: '.' + 'MessageBarWarning',
  commands: [defaultScreenshot]
});
componentIds.push({
  fileName: 'messageBarSevereWarning',
  selector: '.' + 'MessageBarSevereWarning',
  commands: [defaultScreenshot]
});
componentIds.push({
  fileName: 'messageBarBlocked',
  selector: '.' + 'MessageBarBlocked',
  commands: [defaultScreenshot]
});
componentIds.push({
  fileName: 'messageBarSuccess',
  selector: '.' + 'MessageBarSuccess',
  commands: [defaultScreenshot]
});

casper.
  start(baseUrl + 'messageBar').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });