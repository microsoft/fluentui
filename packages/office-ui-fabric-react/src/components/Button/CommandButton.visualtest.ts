import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
declare var phantomcss: IPhantomCSS;
declare var casper: Casper;
/* tslint:disable:no-function-expression */
casper.
  start(baseUrl + 'commandButton').
  then(function () {
    phantomcss.screenshot('#CommandButton', 'CommandButton_not_pressed');
  }).then(function () {
    this.mouse.move('#CommandButton');
    phantomcss.screenshot('#CommandButton', 'CommandButton_hovered');
  }).then(function () {
    this.mouse.down('#CommandButton');
    phantomcss.screenshot('#CommandButton', 'CommandButton_pressed');
  });
casper.run(function () { casper.test.done(); });
/* tslint:enable:no-function-expression */