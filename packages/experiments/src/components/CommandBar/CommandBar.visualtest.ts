import { Casper } from 'office-ui-fabric-react/lib/visualtest/PhantomCssInterface';
import { baseUrl } from 'office-ui-fabric-react/lib/common/VisualTest';
import {
  defaultScreenshot, mouseMoveScreenshot, mouseDownScreenshot,
  mouseClickScreenshot, mouseSingleClickScreenshot, testRunner
} from 'office-ui-fabric-react/lib/visualtest/RunVisualTest';
import { IRunVisualTest } from 'office-ui-fabric-react/lib/visualtest/IRunVisualTest';
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