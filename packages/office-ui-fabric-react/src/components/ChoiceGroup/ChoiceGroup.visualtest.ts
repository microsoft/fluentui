import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { defaultScreenshot, mouseMoveScreenshot, mouseDownScreenshot, mouseClickScreenshot } from '../../visualtest/RunVisualTest';
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

function testRunner() {
  componentIds.forEach(element => {
    element.commands.forEach(command => {
      command(element);
    });
  });
}

casper.
  start(baseUrl + 'choiceGroup').
  then(() => {
    testRunner();
  });

casper.run(() => { casper.test.done(); });