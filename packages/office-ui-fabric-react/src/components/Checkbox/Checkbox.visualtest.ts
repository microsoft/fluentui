import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { defaultScreenshot, mouseMoveScreenshot, mouseDownScreenshot, mouseClickScreenshot } from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';

declare var phantomcss: IPhantomCSS;
declare var casper: Casper;
let commands: ((params: IRunVisualTest) => void)[] = [];

commands.push(defaultScreenshot);
commands.push(mouseMoveScreenshot);
commands.push(mouseDownScreenshot);
commands.push(mouseClickScreenshot);

let componentIds: IRunVisualTest[] = [];

componentIds.push({
  componentExtnid: '.' + 'Checkbox',
  fileName: 'checkbox',
  command: commands
});
componentIds.push({
  componentExtnid: '.' + 'CheckboxDisabled',
  fileName: 'checkboxDisabled',
  command: commands
});

function testRunner() {
  componentIds.forEach(element => {
    element.command.forEach(command => {
      command(element);
    });
  });
}

casper.
  start(baseUrl + 'checkbox').
  then(() => {
    testRunner();
  });

casper.run(() => { casper.test.done(); });
