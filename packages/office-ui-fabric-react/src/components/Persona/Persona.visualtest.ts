import { Casper } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { defaultScreenshot, testRunner } from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';
declare var casper: Casper;
let componentIds: IRunVisualTest[] = [];

componentIds.push({
  selector: '.' + 'PersonaTiny',
  fileName: 'personaTiny',
  commands: [defaultScreenshot]
});
componentIds.push({
  selector: '.' + 'PersonaExtraExtraSmall',
  fileName: 'personaExtraExtraSmall',
  commands: [defaultScreenshot]
});

componentIds.push({
  selector: '.' + 'PersonaSize28',
  fileName: 'personaSize28',
  commands: [defaultScreenshot]
});
componentIds.push({
  selector: '.' + 'PersonaExtraSmall',
  fileName: 'personaExtraSmall',
  commands: [defaultScreenshot]
});
componentIds.push({
  selector: '.' + 'PersonaSmall',
  fileName: 'personaSmall',
  commands: [defaultScreenshot]
});
componentIds.push({
  selector: '.' + 'PersonaBusy',
  fileName: 'personaBusy',
  commands: [defaultScreenshot]
});

componentIds.push({
  selector: '.' + 'PersonaBlocked',
  fileName: 'personaBlocked',
  commands: [defaultScreenshot]
});
componentIds.push({
  selector: '.' + 'PersonaInitials',
  fileName: 'personaInitials',
  commands: [defaultScreenshot]
});
componentIds.push({
  selector: '.' + 'PersonaCustom',
  fileName: 'personaCustom',
  commands: [defaultScreenshot]
});

casper.
  start(baseUrl + 'persona').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });