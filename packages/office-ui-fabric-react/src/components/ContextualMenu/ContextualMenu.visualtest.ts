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
  componentExtnid: '#' + 'ContextualMenu',
  fileName: 'contextualMenu',
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
  start(baseUrl + 'contextualMenu').
  then(() => {
    testRunner();
  });

casper.run(() => { casper.test.done(); });
