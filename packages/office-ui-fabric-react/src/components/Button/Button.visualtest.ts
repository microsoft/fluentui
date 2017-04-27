import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import {
  defaultScreenshot, mouseMoveScreenshot, mouseDownScreenshot,
  mouseClickScreenshot, testRunner, mouseSingleClickScreenshot
} from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';

declare var phantomcss: IPhantomCSS;
declare var casper: Casper;

let componentIds: IRunVisualTest[] = [];

componentIds.push({
  selector: '#' + 'DefaultButton',
  fileName: 'defaultButton',
  commands: [defaultScreenshot, mouseClickScreenshot, mouseDownScreenshot, mouseMoveScreenshot]
});

componentIds.push({
  selector: '#' + 'DefaultButtonDisabled',
  fileName: 'defaultButtonDisabled',
  commands: [defaultScreenshot]
});
componentIds.push({
  selector: '#' + 'PrimaryButton',
  fileName: 'primaryButton',
  commands: [defaultScreenshot, mouseClickScreenshot, mouseDownScreenshot, mouseMoveScreenshot]

});
componentIds.push({
  selector: '#' + 'PrimaryButtonDisabled',
  fileName: 'primaryButtonDisabled',
  commands: [defaultScreenshot]
});

componentIds.push({
  selector: '#' + 'CommandButton',
  fileName: 'commandButton',
  commands: [defaultScreenshot, mouseDownScreenshot, mouseMoveScreenshot, mouseClickScreenshot]
});

componentIds.push({
  selector: '#' + 'CommandButtonDisabled',
  fileName: 'commandButtonDisabled',
  commands: [defaultScreenshot]
});

componentIds.push({
  selector: '#' + 'CompoundButton',
  fileName: 'compoundButton',
  commands: [defaultScreenshot, mouseClickScreenshot, mouseDownScreenshot, mouseMoveScreenshot]
});
componentIds.push({
  selector: '#' + 'CompoundButtonDisabled',
  fileName: 'compoundButtonDisabled',
  commands: [defaultScreenshot]
});
componentIds.push({
  selector: '#' + 'ContextualButton',
  fileName: 'contextualButton',
  commands: [defaultScreenshot, mouseClickScreenshot, mouseDownScreenshot, mouseMoveScreenshot]
});

componentIds.push({
  selector: '#' + 'ContextualButtonDisabled',
  fileName: 'contextualButtonDisabled',
  commands: [defaultScreenshot]
});

componentIds.push({
  selector: '#' + 'ContextualButton',
  fileName: 'contextualButton',
  commands: [mouseSingleClickScreenshot],
  childParams: {
    selector: '.' + 'ms-ContextualMenu-list',
    fileName: 'contextualButtonMenu',
    commands: [defaultScreenshot]
  }
});

casper.
  start(baseUrl + 'button').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });