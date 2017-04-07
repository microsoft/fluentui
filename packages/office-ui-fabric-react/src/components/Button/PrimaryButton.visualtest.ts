import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
declare var phantomcss: IPhantomCSS;
declare var casper: Casper;
/* tslint:disable:no-function-expression */
casper.
  start(baseUrl + 'primaryButton').
  then(function () {
    phantomcss.screenshot('#PrimaryButton', 'PrimaryButton_not_pressed');
  }).then(function () {
    this.mouse.move('#PrimaryButton');
    phantomcss.screenshot('#PrimaryButton', 'PrimaryButton_hovered');
  }).then(function () {
    this.mouse.down('#PrimaryButton');
    phantomcss.screenshot('#PrimaryButton', 'PrimaryButton_pressed');
  });
casper.run(function () { casper.test.done(); });
/* tslint:enable:no-function-expression */