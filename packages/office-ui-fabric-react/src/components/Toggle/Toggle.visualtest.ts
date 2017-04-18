
import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { RunVisualTest } from '../../visualtest/RunVisualTest';
import { idType } from '../../visualtest/RunVisualTest';

declare var casper: Casper;



var componentIds = ["ToggleEnabledChecked", "ToggleDisabledChecked"];
var temp = [];
componentIds.map(function (ids) {
  temp.push(new RunVisualTest(casper, ids, idType.ID));
});

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

casper.run(function () { casper.test.done(); });
/* tslint:enable:no-function-expression */