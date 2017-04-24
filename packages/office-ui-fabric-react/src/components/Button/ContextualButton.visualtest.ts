import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { defaultScreenshot, mouseMoveScreenshot, mouseDownScreenshot, mouseClickScreenshot, mouseSingleClickScreenshot, testRunner } from '../../visualtest/RunVisualTest';
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
  selector: '#' + 'ContextualButton',
  fileName: 'contextualButton',
  commands: commands
});

componentIds.push({
  selector: '#' + 'ContextualButtonDisabled',
  fileName: 'contextualButtonDisabled',
  commands: commands
});

componentIds.push({
  selector: '#' + 'ContextualButton',
  fileName: 'contextualButton',
  commands: [mouseSingleClickScreenshot],
  childParams: {
    selector: '.' + 'ms-ContextualMenu-list',
    fileName: 'contextualButtonMenu',
    commands: commands
  }
});

casper.
  start(baseUrl + 'contextualButton').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });