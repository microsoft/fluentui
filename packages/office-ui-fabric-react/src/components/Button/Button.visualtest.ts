import { Casper } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import {
  defaultScreenshot, mouseMoveScreenshot, mouseDownScreenshot,
  mouseClickScreenshot, testRunner, mouseSingleClickScreenshot
} from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';
declare var casper: Casper;
let componentIds: IRunVisualTest[] = [];

componentIds.push({
  selector: '#' + 'DefaultButton',
  fileName: 'buttonDefault',
  commands: [defaultScreenshot, mouseClickScreenshot, mouseDownScreenshot, mouseMoveScreenshot]
});
componentIds.push({
  selector: '#' + 'DefaultButtonDisabled',
  fileName: 'buttonDefaultDisabled',
  commands: [defaultScreenshot]
});
componentIds.push({
  selector: '#' + 'DefaultButtonChecked',
  fileName: 'buttonDefaultChecked',
  commands: [defaultScreenshot]
});

componentIds.push({
  selector: '#' + 'PrimaryButton',
  fileName: 'buttonPrimary',
  commands: [defaultScreenshot, mouseClickScreenshot, mouseDownScreenshot, mouseMoveScreenshot]

});
componentIds.push({
  selector: '#' + 'PrimaryButtonDisabled',
  fileName: 'buttonPrimaryDisabled',
  commands: [defaultScreenshot]
});
componentIds.push({
  selector: '#' + 'PrimaryButtonChecked',
  fileName: 'buttonPrimaryChecked',
  commands: [defaultScreenshot]
});

componentIds.push({
  selector: '#' + 'CommandButton',
  fileName: 'buttonCommand',
  commands: [defaultScreenshot, mouseDownScreenshot, mouseMoveScreenshot, mouseClickScreenshot]
});
componentIds.push({
  selector: '#' + 'CommandButtonDisabled',
  fileName: 'buttonCommandDisabled',
  commands: [defaultScreenshot]
});
componentIds.push({
  selector: '#' + 'CommandButtonChecked',
  fileName: 'buttonCommandChecked',
  commands: [defaultScreenshot]
});

componentIds.push({
  selector: '#' + 'CompoundButton',
  fileName: 'buttonCompound',
  commands: [defaultScreenshot, mouseClickScreenshot, mouseDownScreenshot, mouseMoveScreenshot]
});
componentIds.push({
  selector: '#' + 'CompoundButtonDisabled',
  fileName: 'buttonCompoundDisabled',
  commands: [defaultScreenshot]
});
componentIds.push({
  selector: '#' + 'CompoundButtonChecked',
  fileName: 'buttonCompoundChecked',
  commands: [defaultScreenshot]
});

componentIds.push({
  selector: '#' + 'ContextualButton',
  fileName: 'buttonContextual',
  commands: [defaultScreenshot, mouseClickScreenshot, mouseDownScreenshot, mouseMoveScreenshot]
});
componentIds.push({
  selector: '#' + 'ContextualButton',
  fileName: 'buttonContextual',
  commands: [mouseSingleClickScreenshot],
  childParams: {
    selector: '.' + 'ms-ContextualMenu-list',
    fileName: 'buttonContextualMenu',
    commands: [defaultScreenshot]
  }
});
componentIds.push({
  selector: '#' + 'ContextualButtonChecked',
  fileName: 'buttonContextualChecked',
  commands: [defaultScreenshot, mouseClickScreenshot, mouseDownScreenshot, mouseMoveScreenshot]
});

casper.
  start(baseUrl + 'button').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });