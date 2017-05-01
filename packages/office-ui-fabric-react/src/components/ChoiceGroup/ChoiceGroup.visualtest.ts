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
  selector: '.' + 'ChoiceGroup',
  fileName: 'choiceGroup',
  commands: commands
});

componentIds.push({
  selector: '.' + 'ChoiceGroupDisabled',
  fileName: 'choiceGroupDisabled',
  commands: commands
});

componentIds.push({
  selector: '.' + 'ChoiceGroupIcon',
  fileName: 'choiceGroupIcon',
  commands: commands
});

casper.
  start(baseUrl + 'choiceGroup').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });