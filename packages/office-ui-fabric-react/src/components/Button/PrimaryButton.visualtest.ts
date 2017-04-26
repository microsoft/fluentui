import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import {
  defaultScreenshot, mouseMoveScreenshot, mouseDownScreenshot,
  mouseClickScreenshot, testRunner
} from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';

declare var phantomcss: IPhantomCSS;
declare var casper: Casper;

let componentIds: IRunVisualTest[] = [];

componentIds.push({
  selector: '#' + 'PrimaryButton',
  fileName: 'primaryButton',
  commands: [defaultScreenshot, mouseClickScreenshot, mouseDownScreenshot, mouseMoveScreenshot]

});
componentIds.push({
  selector: '#' + 'PrimaryButtonDisabled',
  fileName: 'primaryButtonDisabled',
  commands: [defaultScreenshot]
});

casper.
  start(baseUrl + 'primaryButton').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });
