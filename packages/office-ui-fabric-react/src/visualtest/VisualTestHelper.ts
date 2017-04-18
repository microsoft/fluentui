import { Casper, IPhantomCSS } from './PhantomCssInterface';
import { baseUrl } from '../common/VisualTest';
import { RunVisualTest } from './RunVisualTest';
import { idType } from './RunVisualTest';

declare var casper: Casper;


var componentIds = ["ToggleEnabledChecked", "ToggleDisabledChecked"];


var togTest = new RunVisualTest(casper, "ToggleEnabledChecked", idType.ID);

let temp = [togTest];
temp.push(new RunVisualTest(casper, "ToggleDisabledChecked", idType.ID));



/* tslint:disable:no-function-expression */
casper.
  start(baseUrl + 'toggle').
  // each<Test>(temp, function (item: Test) {
  // item.defaultScreenshot();
  // item.mouseDownScreenshot();
  // item.mouseMoveScreenshot();
  // item.mouseClickedScreenshot();
  then(function () {
    temp.map(function (test) {
      test.defaultScreenshot();
      test.mouseDownScreenshot();
      test.mouseMoveScreenshot();
      test.mouseClickedScreenshot();

    });
  });

togTest.endTest();
/* tslint:enable:no-function-expression */