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
  componentExtnid: '#' + 'CompoundButton',
  fileName: 'compoundButton',
  command: commands
});
componentIds.push({
  componentExtnid: '#' + 'CompoundButtonDisabled',
  fileName: 'compoundButtonDisabled',
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
  start(baseUrl + 'compoundButton').
  then(function () {
    testRunner();
  });

casper.run(function () { casper.test.done(); });
