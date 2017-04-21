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
  componentExtnid: '.' + 'ChoiceGroup',
  fileName: 'choiceGroup',
  command: commands
});

componentIds.push({
  componentExtnid: '.' + 'ChoiceGroupDisabled',
  fileName: 'choiceGroupDisabled',
  command: commands
});

componentIds.push({
  componentExtnid: '.' + 'ChoiceGroupIcon',
  fileName: 'choiceGroupIcon',
  command: commands
});


function testRunner() {
  componentIds.forEach(element => {
    element.command.forEach(command => {
      command(element);
    })
  });
}

casper.
  start(baseUrl + 'choiceGroup').
  then(function () {
    testRunner();
  });

casper.run(function () { casper.test.done(); });
