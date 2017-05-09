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
  selector: '.' + 'ms-DetailsRow',
  imageSelector: '.' + 'DetailsList',
  fileName: 'detailsList',
  commands: [defaultScreenshot, mouseDownScreenshot, mouseMoveScreenshot, mouseClickScreenshot]

});

casper.
  start(baseUrl + 'detailsList').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });
