import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import {
  defaultScreenshot, mouseMoveScreenshot, testRunner
} from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';

declare var phantomcss: IPhantomCSS;
declare var casper: Casper;

let componentIds: IRunVisualTest[] = [];

componentIds.push({
  selector: '.' + 'DocumentCard',
  fileName: 'documentCard',
  commands: [defaultScreenshot, mouseMoveScreenshot]
});

casper.
  start(baseUrl + 'documentCard').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });
