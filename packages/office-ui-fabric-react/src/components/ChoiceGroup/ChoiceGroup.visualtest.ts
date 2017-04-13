import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
declare var phantomcss: IPhantomCSS;
declare var casper: Casper;
/* tslint:disable:no-function-expression */
casper.
  start(baseUrl + 'choiceGroup').
  then(function () {
    phantomcss.screenshot('.ChoiceGroup', 'ChoiceGroup_not_pressed');
  }).then(function () {
    this.mouse.move('.ChoiceGroup');
    phantomcss.screenshot('.ChoiceGroup', 'ChoiceGroup_hovered');
  }).then(function () {
    this.mouse.down('.ChoiceGroup');
    phantomcss.screenshot('.ChoiceGroup', 'ChoiceGroup_pressed');
  }).
  then(function () {
    phantomcss.screenshot('.ChoiceGroupIcon', 'ChoiceGroupIcon_not_pressed');
  }).then(function () {
    this.mouse.move('.ChoiceGroupIcon');
    phantomcss.screenshot('.ChoiceGroupIcon', 'ChoiceGroupIcon_hovered');
  }).then(function () {
    this.mouse.down('.ChoiceGroupIcon');
    phantomcss.screenshot('.ChoiceGroupIcon', 'ChoiceGroupIcon_pressed');
  }).then(function () {
    phantomcss.screenshot('.ChoiceGroupDisabled', 'ChoiceGroupDisabled_not_pressed');
  }).then(function () {
    this.mouse.move('.ChoiceGroupDisabled');
    phantomcss.screenshot('.ChoiceGroupDisabled', 'ChoiceGroupDisabled_hovered');
  }).then(function () {
    this.mouse.down('.ChoiceGroupDisabled');
    phantomcss.screenshot('.ChoiceGroupDisabled', 'ChoiceGroupDisabled_pressed');
  });
casper.run(function () { casper.test.done(); });
/* tslint:enable:no-function-expression */