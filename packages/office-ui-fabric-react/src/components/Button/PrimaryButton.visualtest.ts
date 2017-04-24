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
  selector: '#' + 'PrimaryButton',
  fileName: 'primaryButton',
  commands: commands
});
componentIds.push({
  selector: '#' + 'PrimaryButtonDisabled',
  fileName: 'primaryButtonDisabled',
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
  start(baseUrl + 'primaryButton').
  then(() => {
    testRunner();
  });

casper.run(() => { casper.test.done(); });
