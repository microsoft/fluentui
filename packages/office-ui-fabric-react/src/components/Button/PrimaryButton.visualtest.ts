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
  componentExtnid: '#' + 'PrimaryButton',
  fileName: 'primaryButton',
  command: commands
});
componentIds.push({
  componentExtnid: '#' + 'PrimaryButtonDisabled',
  fileName: 'primaryButtonDisabled',
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
  start(baseUrl + 'primaryButton').
  then(function () {
    testRunner();
  });

casper.run(function () { casper.test.done(); });
