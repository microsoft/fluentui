
import { Casper, IPhantomCSS } from './PhantomCssInterface';
import { baseUrl } from '../common/VisualTest';
import { RunVisualTest } from './RunVisualTest';
import { defaultScreenshot, mouseMoveScreenshot } from './RunVisualTest';
import { IRunVisualTest } from './IRunVisualTest';

declare var phantomcss: IPhantomCSS;
declare var casper: Casper;

let componentIds: RunVisualTest[] = [];


let comp1 = new RunVisualTest({
  componentExtnid: '#CommandButton',
  fileName: 'commandButton'
});

componentIds.push(comp1);


let commands: ((params: IRunVisualTest) => void)[] = [];

commands.push(defaultScreenshot);
commands.push(mouseMoveScreenshot);

function testRunner() {
  componentIds.forEach(element => {
    commands.forEach(command => {
      command(element);
    })
  });
}

casper.
  start(baseUrl + 'commandButton').
  then(function () {
    testRunner();
  });

casper.run(function () { casper.test.done(); });