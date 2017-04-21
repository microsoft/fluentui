import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { RunVisualTest } from '../../visualtest/RunVisualTest';
import { defaultScreenshot, mouseMoveScreenshot, mouseDownScreenshot, mouseClickScreenshot } from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';

declare var phantomcss: IPhantomCSS;
declare var casper: Casper;

let componentIds: RunVisualTest[] = [];

let button = new RunVisualTest({
  componentExtnid: '#' + 'DefaultButton',
  fileName: 'defaultButton'
});

let disabledButton = new RunVisualTest({
  componentExtnid: '#' + 'DefaultButtonDisabled',
  fileName: 'defaultButtonDisabled'
});

componentIds.push(button);
componentIds.push(disabledButton);

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
  start(baseUrl + 'defaultButton').
  then(function () {
    testRunner();
  });

casper.run(function () { casper.test.done(); });
