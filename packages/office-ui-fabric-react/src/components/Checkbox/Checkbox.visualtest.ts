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
  componentIds.forEach(function (element) {
    element.command.forEach(function (command) {
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
