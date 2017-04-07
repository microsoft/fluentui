import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
declare var phantomcss: IPhantomCSS;
declare var casper: Casper;
/* tslint:disable:no-function-expression */
casper.
  start(baseUrl + 'commandBar').
  then(function () {
    phantomcss.screenshot('#CommandBar', 'CommandBar_not_pressed');
  }).then(function () {
    this.mouse.move('#CommandBar');
    phantomcss.screenshot('#CommandBar', 'CommandBar_hovered');
  }).then(function () {
    this.mouse.down('#CommandBar');
    phantomcss.screenshot('#CommandBar', 'CommandBar_pressed');
  });;
casper.run(function () { casper.test.done(); });
/* tslint:enable:no-function-expression */