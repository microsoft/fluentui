import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
declare var phantomcss: IPhantomCSS;
declare var casper: Casper;
/* tslint:disable:no-function-expression */
casper.
  start(baseUrl + 'link').
  then(function () {
    phantomcss.screenshot('.Link', 'Link_not_pressed');
  }).then(function () {
    this.mouse.move('.Link');
    phantomcss.screenshot('.Link', 'Link_hovered');
  }).then(function () {
    this.mouse.down('.Link');
    phantomcss.screenshot('.Link', 'Link_pressed');
  }).
  then(function () {
    phantomcss.screenshot('.LinkDisabled', 'LinkDisabled_not_pressed');
  }).then(function () {
    this.mouse.move('.LinkDisabled');
    phantomcss.screenshot('.LinkDisabled', 'LinkDisabled_hovered');
  }).then(function () {
    this.mouse.down('.LinkDisabled');
    phantomcss.screenshot('.LinkDisabled', 'LinkDisabled_pressed');
  });
casper.run(function () { casper.test.done(); });
/* tslint:enable:no-function-expression */