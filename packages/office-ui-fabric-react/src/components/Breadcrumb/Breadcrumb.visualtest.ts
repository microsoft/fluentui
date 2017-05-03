import { Casper } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { defaultScreenshot, mouseMoveScreenshot, mouseDownScreenshot, mouseClickScreenshot, testRunner } from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';

declare var casper: Casper;
let componentIds: IRunVisualTest[] = [];

componentIds.push({
  selector: '.' + 'Breadcrumb',
  fileName: 'breadcrumb',
  imageSelector: '.' + 'Breadcrumb',

  commands: [defaultScreenshot]
});
componentIds.push({
  selector: '.' + 'ms-Breadcrumb-listItem',
  fileName: 'breadcrumb',
  imageSelector: '.' + 'Breadcrumb',
  commands: [mouseMoveScreenshot, mouseDownScreenshot, mouseClickScreenshot]
});

casper.
  start(baseUrl + 'breadcrumb').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });