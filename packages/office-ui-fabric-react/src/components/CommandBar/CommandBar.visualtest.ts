import { Casper } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import {
  defaultScreenshot, mouseMoveScreenshot, mouseDownScreenshot,
  mouseClickScreenshot, mouseSingleClickScreenshot, testRunner
} from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';
declare var casper: Casper;
let componentIds: IRunVisualTest[] = [];

componentIds.push({
  selector: '.' + 'ms-CommandBarItem-link',
  imageSelector: '.' + 'CommandBar',
  fileName: 'commandBar',
  commands: [defaultScreenshot, mouseMoveScreenshot, mouseDownScreenshot, mouseClickScreenshot]
});

componentIds.push({
  selector: '.' + 'ms-CommandBarItem-link',
  imageSelector: '.' + 'CommandBar',
  fileName: 'commandBarItem',
  commands: [mouseSingleClickScreenshot],
  childParams: {
    selector: '.' + 'ms-ContextualMenu-list',
    imageSelector: '.' + 'ms-ContextualMenu-Callout',
    fileName: 'commandBarItem',
    commands: [defaultScreenshot],
  }
});

casper.
  start(baseUrl + 'commandBar').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });