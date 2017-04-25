import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { defaultScreenshot, mouseMoveScreenshot, mouseDownScreenshot, mouseClickScreenshot, testRunner } from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';

declare var phantomcss: IPhantomCSS;
declare var casper: Casper;

let componentIds: IRunVisualTest[] = [];

let commands: ((params: IRunVisualTest) => void)[] = [];

commands.push(defaultScreenshot);
commands.push(mouseMoveScreenshot);
commands.push(mouseDownScreenshot);
commands.push(mouseClickScreenshot);

componentIds.push({
  selector: '.' + 'Label',
  fileName: 'label',
  commands: commands
});

componentIds.push({
  selector: '.' + 'DisabledLabel',
  fileName: 'disabledLabel',
  commands: commands
});
componentIds.push({
  selector: '.' + 'RequiredLabel',
  fileName: 'requiredLabel',
  commands: commands
});

casper.
  start(baseUrl + 'label').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });