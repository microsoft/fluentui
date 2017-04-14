import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
declare var phantomcss: IPhantomCSS;
declare var casper: Casper;
/* tslint:disable:no-function-expression */
casper.
  start(baseUrl + 'facepile').
  then(function () {
    phantomcss.screenshot('.Facepile', 'Facepile_not_pressed');
  }).then(function () {
    this.mouse.move('.Facepile');
    phantomcss.screenshot('.Facepile', 'Facepile_hovered');
  }).then(function () {
    this.mouse.down('.Facepile');
    phantomcss.screenshot('.Facepile', 'Facepile_pressed');
  });
casper.run(function () { casper.test.done(); });
/* tslint:enable:no-function-expression */