import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
declare var phantomcss: IPhantomCSS;
declare var casper: Casper;
/* tslint:disable:no-function-expression */
casper.
  start(baseUrl + 'checkbox').
  then(function () {
    phantomcss.screenshot('.Checkbox', 'Checkbox_not_pressed');
  }).then(function () {
    this.mouse.move('.Checkbox');
    phantomcss.screenshot('.Checkbox', 'Checkbox_hovered');
  }).then(function () {
    this.mouse.down('.Checkbox');
    phantomcss.screenshot('.Checkbox', 'Checkbox_pressed');
  }).
  then(function () {
    phantomcss.screenshot('.CheckboxDisabled', 'CheckboxDisabled_not_pressed');
  }).then(function () {
    this.mouse.move('.CheckboxDisabled');
    phantomcss.screenshot('.CheckboxDisabled', 'CheckboxDisabled_hovered');
  }).then(function () {
    this.mouse.down('.CheckboxDisabled');
    phantomcss.screenshot('.CheckboxDisabled', 'CheckboxDisabled_pressed');
  });
casper.run(function () { casper.test.done(); });
/* tslint:enable:no-function-expression */