import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { defaultScreenshot, mouseMoveScreenshot, mouseDownScreenshot, mouseClickScreenshot, mouseSingleClickScreenshot } from '../../visualtest/RunVisualTest';
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
  componentExtnid: '#' + 'ContextualButton',
  fileName: 'contextualButton',
  command: commands
});

componentIds.push({
  componentExtnid: '#' + 'ContextualButtonDisabled',
  fileName: 'contextualButtonDisabled',
  command: commands
});

componentIds.push({
  componentExtnid: '#' + 'ContextualButton',
  fileName: 'contextualButton',
  command: [mouseSingleClickScreenshot],
  childParam: {
    componentExtnid: '.' + 'ms-ContextualMenu-list',
    fileName: 'contextualButtonMenu',
    command: commands
  }
});

function testRunner() {
  componentIds.forEach(element => {
    element.command.forEach(command => {
      command(element);
    });
  });
}

casper.
  start(baseUrl + 'contextualButton').
  then(() => {
    testRunner();
  });

casper.run(() => { casper.test.done(); });