import { Casper, PhantomCSS } from '../../visualtest/PhantomCssInterface';
declare var phantomcss: PhantomCSS;
declare var casper: Casper;
casper.test.begin('Basic button Test', 2, function () {
  casper.
    start('http://localhost:8080/#/Button').
    then(function () {
      phantomcss.screenshot('#HI', 'Button not pressed');

    }).then(function () {
      this.mouse.down('#HI');
      phantomcss.screenshot('#HI', 'Button pressed');
    });
  casper.run(function () { casper.test.done(); });
});