import { dropdownSlotClassNames } from '@fluentui/react-northstar';
import { selectors } from './dialogInDialogWithDropdown-example';

const outerHeader = `#${selectors.outerHeader}`;
const outerTrigger = `#${selectors.outerTrigger}`;
const innerHeader = `#${selectors.innerHeader}`;
const innerTrigger = `#${selectors.innerTrigger}`;
const dropdownSelector = `#${selectors.dropdown}`;
const dropdownIndicator = `.${dropdownSlotClassNames.toggleIndicator}`;

describe('Dialog in Dialog', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, outerTrigger);
  });

  it('Nested dialog should have dropdown', async () => {
    await e2e.clickOn(outerTrigger);
    await e2e.clickOn(innerTrigger);

    await e2e.exists(dropdownSelector);
  });

  it('Should not close any modal when ESC pressed inside dropdown', async () => {
    await e2e.clickOn(outerTrigger);
    await e2e.clickOn(innerTrigger);

    await e2e.clickOn(dropdownIndicator);
    await e2e.pressKey('Escape');

    await e2e.exists(innerHeader);
    await e2e.exists(outerHeader);
    await e2e.exists(dropdownSelector);
  });

  it('Should modal with dropdown when ESC pressed outside dropdown', async () => {
    await e2e.clickOn(outerTrigger);
    await e2e.clickOn(innerTrigger);

    await e2e.clickOn(innerHeader);
    await e2e.pressKey('Escape');

    await e2e.hidden(dropdownSelector);
    await e2e.hidden(innerHeader);
    await e2e.exists(outerHeader);
  });
});
