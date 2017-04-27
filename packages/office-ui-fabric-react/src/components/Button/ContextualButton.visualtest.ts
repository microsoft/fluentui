import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { defaultScreenshot, mouseMoveScreenshot, mouseDownScreenshot, mouseClickScreenshot, mouseSingleClickScreenshot, testRunner } from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';

declare var phantomcss: IPhantomCSS;
declare var casper: Casper;

let componentIds: IRunVisualTest[] = [];

componentIds.push({
  selector: '#' + 'ContextualButton',
  fileName: 'contextualButton',
  commands: [defaultScreenshot, mouseClickScreenshot, mouseDownScreenshot, mouseMoveScreenshot]
});

componentIds.push({
  selector: '#' + 'ContextualButtonDisabled',
  fileName: 'contextualButtonDisabled',
  commands: [defaultScreenshot]
});

componentIds.push({
  selector: '#' + 'ContextualButton',
  fileName: 'contextualButton',
  commands: [mouseSingleClickScreenshot],
  childParams: {
    selector: '.' + 'ms-ContextualMenu-list',
    fileName: 'contextualButtonMenu',
    commands: [defaultScreenshot]
  }
});

casper.
  start(baseUrl + 'contextualButton').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });