import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
declare var phantomcss: IPhantomCSS;
declare var casper: Casper;
/* tslint:disable:no-function-expression */
casper.
  start(baseUrl + 'defaultButton').
  then(function () {
    phantomcss.screenshot('#DefaultButton', 'DefaultButton_not_pressed');
  }).then(function () {
    this.mouse.move('#DefaultButton');
    phantomcss.screenshot('#DefaultButton', 'DefaultButton_hovered');
  }).then(function () {
    this.mouse.down('#DefaultButton');
    phantomcss.screenshot('#DefaultButton', 'DefaultButton_pressed');
  }).
  then(function () {
    phantomcss.screenshot('#DefaultButtonDisabled', 'DefaultButtonDisabled_not_pressed');
  }).then(function () {
    this.mouse.move('#DefaultButtonDisabled');
    phantomcss.screenshot('#DefaultButtonDisabled', 'DefaultButtonDisabled_hovered');
  }).then(function () {
    this.mouse.down('#DefaultButtonDisabled');
    phantomcss.screenshot('#DefaultButtonDisabled', 'DefaultButtonDisabled_pressed');
  }).then(function () {
    phantomcss.screenshot('#IconButton', 'Icon_Button');
  });
casper.run(function () { casper.test.done(); });
/* tslint:enable:no-function-expression */