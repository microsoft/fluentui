import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
declare var phantomcss: IPhantomCSS;
declare var casper: Casper;
/* tslint:disable:no-function-expression */
casper.
  start('http://localhost:8080/#/Button').
  then(function () {
    phantomcss.screenshot('#HI', 'Button_not_pressed');
  }).then(function () {
    this.mouse.move('#HI');
    phantomcss.screenshot('#HI', 'Button_Hovered');
  }).then(function () {
    this.mouse.down('#HI');
    phantomcss.screenshot('#HI', 'Button_pressed');
  });
casper.run(function () { casper.test.done(); });
/* tslint:enable:no-function-expression */