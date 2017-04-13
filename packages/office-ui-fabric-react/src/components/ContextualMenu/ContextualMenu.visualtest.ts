import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
declare var phantomcss: IPhantomCSS;
declare var casper: Casper;
/* tslint:disable:no-function-expression */
casper.
  start(baseUrl + 'contextualMenu').
  then(function () {
    phantomcss.screenshot('#ContextualMenu', 'ContextualMenu_not_pressed');
  }).then(function () {
    this.mouse.move('#ContextualMenu');
    phantomcss.screenshot('#ContextualMenu', 'ContextualMenu_hovered');
  }).then(function () {
    this.mouse.down('#ContextualMenu');
    phantomcss.screenshot('#ContextualMenu', 'ContextualMenu_pressed');
  });
casper.run(function () { casper.test.done(); });
/* tslint:enable:no-function-expression */