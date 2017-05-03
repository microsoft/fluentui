import { Casper} from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import {
  defaultScreenshot, mouseMoveScreenshot, mouseDownScreenshot,
  mouseClickScreenshot, testRunner
} from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';

declare var casper: Casper;

let componentIds: IRunVisualTest[] = [];

componentIds.push({
  selector: '.' + 'ms-ContextualMenu-itemText',
  imageSelector: '#' + 'ContextualMenu',
  fileName: 'contextualMenu',
  commands: [defaultScreenshot, mouseDownScreenshot, mouseMoveScreenshot, mouseClickScreenshot]

});

casper.
  start(baseUrl + 'contextualMenu').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });
