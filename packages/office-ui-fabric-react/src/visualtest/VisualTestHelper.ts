import { Casper, IPhantomCSS } from './PhantomCssInterface';
import { baseUrl } from '../common/VisualTest';
import { RunVisualTest } from './RunVisualTest';
import { idType, screenEvent } from './RunVisualTest';

declare var casper: Casper;


var componentIds = [
  {
    key: "ContextualButton",
    value: [screenEvent.DEFAULT, screenEvent.DOWN, screenEvent.HOVERED, screenEvent.CLICK]
  },
  {
    key: "ContextualButtonDisabled",
    value: [screenEvent.DEFAULT, screenEvent.DOWN, screenEvent.HOVERED, screenEvent.CLICK]
  }
];



var temp = [];

componentIds.map(function (ids) {
  temp.push(new RunVisualTest(casper, ids, idType.ID));
});

/* tslint:disable:no-function-expression */
casper.
  start(baseUrl + 'contextualButton').
  then(function () {
    temp.map(function (test) {
      test.listEventScreenshot();
    });
  });

casper.run(function () { casper.test.done(); });
/* tslint:enable:no-function-expression */