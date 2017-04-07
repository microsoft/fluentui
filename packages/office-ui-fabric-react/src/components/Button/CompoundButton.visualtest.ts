import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
declare var phantomcss: IPhantomCSS;
declare var casper: Casper;
/* tslint:disable:no-function-expression */
casper.
  start(baseUrl + 'compoundButton').
  then(function () {
    phantomcss.screenshot('#CompoundButton', 'CompoundButton_not_pressed');
  }).then(function () {
    this.mouse.move('#CompoundButton');
    phantomcss.screenshot('#CompoundButton', 'CompoundButton_hovered');
  }).then(function () {
    this.mouse.down('#CompoundButton');
    phantomcss.screenshot('#CompoundButton', 'CompoundButton_pressed');
  });
casper.run(function () { casper.test.done(); });
/* tslint:enable:no-function-expression */