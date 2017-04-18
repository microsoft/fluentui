import { Casper, IPhantomCSS } from './PhantomCssInterface';
import { baseUrl } from '../common/VisualTest';
import { RunVisualTest } from './RunVisualTest';
import { idType } from './RunVisualTest';

declare var casper: Casper;

var componentIds = ["ToggleEnabledChecked", "ToggleDisabledChecked"];
var temp = [];
componentIds.map(function (ids) {
  temp.push(new RunVisualTest(casper, ids, idType.ID));
});

/* tslint:disable:no-function-expression */
casper.
  start(baseUrl + 'toggle').
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