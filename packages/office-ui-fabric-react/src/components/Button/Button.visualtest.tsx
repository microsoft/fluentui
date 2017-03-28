import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
declare var phantomcss: IPhantomCSS;
declare var casper: Casper;
/* tslint:disable:no-function-expression */
casper.
  start('http://localhost:8080/#/Button').
  then(function () {
    phantomcss.screenshot('#DefaultButton', 'Button_not_pressed');
  }).then(function () {
    this.mouse.move('#DefaultButton');
    phantomcss.screenshot('#DefaultButton', 'Button_Hovered');
  }).then(function () {
    this.mouse.down('#DefaultButton');
    phantomcss.screenshot('#DefaultButton', 'Button_pressed');
  }).then(function () {
    phantomcss.screenshot('#IconButton', 'Icon_Button');
  })
casper.run(function () { casper.test.done(); });
/* tslint:enable:no-function-expression */