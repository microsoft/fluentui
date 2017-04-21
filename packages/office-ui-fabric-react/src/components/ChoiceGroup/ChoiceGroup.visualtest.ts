import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { RunVisualTest } from '../../visualtest/RunVisualTest';
import { defaultScreenshot, mouseMoveScreenshot, mouseDownScreenshot, mouseClickScreenshot } from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';

declare var phantomcss: IPhantomCSS;
declare var casper: Casper;

let componentIds: RunVisualTest[] = [];

let component = new RunVisualTest({
  componentExtnid: '.' + 'ChoiceGroup',
  fileName: 'choiceGroup'
});

let disabledComponent = new RunVisualTest({
  componentExtnid: '.' + 'ChoiceGroupDisabled',
  fileName: 'choiceGroupDisabled'
});

let iconComponent = new RunVisualTest({
  componentExtnid: '.' + 'ChoiceGroupIcon',
  fileName: 'choiceGroupIcon'
});

componentIds.push(component);
componentIds.push(disabledComponent);
componentIds.push(iconComponent);

let commands: ((params: IRunVisualTest) => void)[] = [];

commands.push(defaultScreenshot);
commands.push(mouseMoveScreenshot);
commands.push(mouseDownScreenshot);
commands.push(mouseClickScreenshot);

function testRunner() {
  componentIds.forEach(element => {
    commands.forEach(command => {
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
