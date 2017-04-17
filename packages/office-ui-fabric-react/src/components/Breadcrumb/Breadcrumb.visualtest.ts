import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
declare var phantomcss: IPhantomCSS;
declare var casper: Casper;
/* tslint:disable:no-function-expression */
casper.start(baseUrl + 'breadcrumb').
  then(function () {
    phantomcss.screenshot('.Breadcrumb', 'Breadcrumb_not_pressed');
  }).then(function () {
    this.mouse.move('.Breadcrumb');
    phantomcss.screenshot('.ms-Breadcrumb-listItem', 'Breadcrumb_hovered');
  }).then(function () {
    this.mouse.down('.ms-Breadcrumb-listItem');
    phantomcss.screenshot('.Breadcrumb', 'Breadcrumb_pressed');
  });
casper.run(function () { casper.test.done(); });
/* tslint:enable:no-function-expression */
