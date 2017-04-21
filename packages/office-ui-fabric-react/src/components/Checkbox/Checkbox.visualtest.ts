import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { RunVisualTest } from '../../visualtest/RunVisualTest';
import { defaultScreenshot, mouseMoveScreenshot, mouseDownScreenshot, mouseClickScreenshot } from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';

declare var phantomcss: IPhantomCSS;
declare var casper: Casper;

let componentIds: RunVisualTest[] = [];

let component = new RunVisualTest({
  componentExtnid: '.' + 'Checkbox',
  fileName: 'checkbox'
});

let disabledComponent = new RunVisualTest({
  componentExtnid: '.' + 'CheckboxDisabled',
  fileName: 'checkboxDisabled'
});

componentIds.push(component);
componentIds.push(disabledComponent);

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
  start(baseUrl + 'checkbox').
  then(function () {
    testRunner();
  });

casper.run(function () { casper.test.done(); });
