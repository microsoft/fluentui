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
  selector: '#' + 'CompoundButton',
  fileName: 'compoundButton',
  commands: commands
});
componentIds.push({
  selector: '#' + 'CompoundButtonDisabled',
  fileName: 'compoundButtonDisabled',
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
  start(baseUrl + 'compoundButton').
  then(() => {
    testRunner();
  });

casper.run(() => { casper.test.done(); });