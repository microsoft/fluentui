import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
declare var phantomcss: IPhantomCSS;
declare var casper: Casper;
/* tslint:disable:no-function-expression */
casper.
  start(baseUrl + 'documentCard').
  then(function () {
    phantomcss.screenshot('.DocumentCard', 'DocumentCard_not_pressed');
  }).then(function () {
    this.mouse.move('.DocumentCard');
    phantomcss.screenshot('.DocumentCard', 'DocumentCard_hovered');
  }).then(function () {
    this.mouse.down('.DocumentCard');
    phantomcss.screenshot('.DocumentCard', 'DocumentCard_pressed');
  }).
  then(function () {
    phantomcss.screenshot('.DocumentCardDisabled', 'DocumentCardDisabled_not_pressed');
  }).then(function () {
    this.mouse.move('.DocumentCardxDisabled');
    phantomcss.screenshot('.DocumentCardDisabled', 'DocumentCardDisabled_hovered');
  }).then(function () {
    this.mouse.down('.DocumentCardDisabled');
    phantomcss.screenshot('.DocumentCardDisabled', 'DocumentCardDisabled_pressed');
  });
casper.run(function () { casper.test.done(); });
/* tslint:enable:no-function-expression */