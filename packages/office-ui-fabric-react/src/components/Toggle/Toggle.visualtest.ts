import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
declare var phantomcss: IPhantomCSS;
declare var casper: Casper;
/* tslint:disable:no-function-expression */
casper.
  start(baseUrl + 'toggle').
  then(function () {
    phantomcss.screenshot('#ToggleEnabledChecked', 'ToggleEnabledChecked_not_pressed');
  }).then(function () {
    this.mouse.move('#ToggleEnabledChecked');
    phantomcss.screenshot('#ToggleEnabledChecked', 'ToggleEnabledChecked_hovered');
  }).then(function () {
    this.mouse.down('#ToggleEnabledChecked');
    phantomcss.screenshot('#ToggleEnabledChecked', 'ToggleEnabledChecked_pressed');
  }).then(function () {
    phantomcss.screenshot('#ToggleEnabledUnchecked', 'ToggleEnabledUnchecked_not_pressed');
  }).then(function () {
    this.mouse.move('#ToggleEnabledUnchecked');
    phantomcss.screenshot('#ToggleEnabledUnchecked', 'ToggleEnabledUnchecked_hovered');
  }).then(function () {
    this.mouse.down('#ToggleEnabledUnchecked');
    phantomcss.screenshot('#ToggleEnabledUnchecked', 'ToggleEnabledUnchecked_pressed');
  }).then(function () {
    phantomcss.screenshot('#ToggleDisabledChecked', 'ToggleDisabledChecked_not_pressed');
  }).then(function () {
    this.mouse.move('#ToggleDisabledChecked');
    phantomcss.screenshot('#ToggleDisabledChecked', 'ToggleDisabledChecked_hovered');
  }).then(function () {
    this.mouse.down('#ToggleDisabledChecked');
    phantomcss.screenshot('#ToggleDisabledChecked', 'ToggleDisabledChecked_pressed');
  }).then(function () {
    phantomcss.screenshot('#ToggleDisabledUnchecked', 'ToggleDisabledUnchecked_not_pressed');
  }).then(function () {
    this.mouse.move('#ToggleDisabledUnchecked');
    phantomcss.screenshot('#ToggleDisabledUnchecked', 'ToggleDisabledUnchecked_hovered');
  }).then(function () {
    this.mouse.down('#ToggleDisabledUnchecked');
    phantomcss.screenshot('#ToggleDisabledUnchecked', 'ToggleDisabledUnchecked_pressed');
  });
casper.run(function () { casper.test.done(); });
/* tslint:enable:no-function-expression */
