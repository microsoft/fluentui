import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
declare var phantomcss: IPhantomCSS;
declare var casper: Casper;
/* tslint:disable:no-function-expression */
casper.
  start(baseUrl + 'contextualButton').
  then(function () {
    phantomcss.screenshot('#ContextualButton', 'ContextualButton_not_pressed');
  }).then(function () {
    this.mouse.move('#ContextualButton');
    phantomcss.screenshot('#ContextualButton', 'ContextualButton_hovered');
  }).then(function () {
    this.mouse.down('#ContextualButton');
    phantomcss.screenshot('#ContextualButton', 'ContextualButton_pressed');
  }).
  then(function () {
    phantomcss.screenshot('#ContextualButtonDisabled', 'ContextualButtonDisabled_not_pressed');
  }).then(function () {
    this.mouse.move('#ContextualButtonDisabled');
    phantomcss.screenshot('#ContextualButtonDisabled', 'ContextualButtonDisabled_hovered');
  }).then(function () {
    this.mouse.down('#ContextualButtonDisabled');
    phantomcss.screenshot('#ContextualButtonDisabled', 'ContextualButtonDisabled_pressed');
  });
casper.run(function () { casper.test.done(); });
/* tslint:enable:no-function-expression */