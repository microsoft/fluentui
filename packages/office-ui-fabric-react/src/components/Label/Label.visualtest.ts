import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
declare var phantomcss: IPhantomCSS;
declare var casper: Casper;
/* tslint:disable:no-function-expression */
casper.
  start(baseUrl + 'label').
  then(function () {
    phantomcss.screenshot('.Label', 'Label_not_pressed');
  }).then(function () {
    this.mouse.move('.Label');
    phantomcss.screenshot('.Label', 'Label_hovered');
  }).then(function () {
    this.mouse.down('.Label');
    phantomcss.screenshot('.Label', 'Label_pressed');
  }).then(function () {
    phantomcss.screenshot('.LabelDisabled', 'LabelDisabled_not_pressed');
  }).then(function () {
    this.mouse.move('.LabelDisabled');
    phantomcss.screenshot('.LabelDisabled', 'LabelDisabled_hovered');
  }).then(function () {
    this.mouse.down('.LabelDisabled');
    phantomcss.screenshot('.LabelDisabled', 'LabelDisabled_pressed');
  }).then(function () {
    phantomcss.screenshot('.LabelRequired', 'LabelRequired_not_pressed');
  }).then(function () {
    this.mouse.move('.LabelDisabled');
    phantomcss.screenshot('.LabelRequired', 'LabelRequired_hovered');
  }).then(function () {
    this.mouse.down('.LabelRequired');
    phantomcss.screenshot('.LabelRequired', 'LabelRequired_pressed');
  });
casper.run(function () { casper.test.done(); });
/* tslint:enable:no-function-expression */