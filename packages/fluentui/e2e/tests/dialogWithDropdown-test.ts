import { selectors } from './dialogWithDropdown-example';
import { dropdownSlotClassNames } from '@fluentui/react-northstar';

const dialogTrigger = `#${selectors.dialogTrigger}`;
const dialogHeader = `#${selectors.dialogHeader}`;
const dropdownSelector = `#${selectors.dropdown}`;
const dropdownIndicator = `.${dropdownSlotClassNames.toggleIndicator}`;
const dropdownList = `.${dropdownSlotClassNames.itemsList}`;

describe('Dialog with dropdown', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, dialogTrigger);
  });

  it('should render with dropdown', async () => {
    await e2e.clickOn(dialogTrigger);
    await e2e.exists(dropdownSelector);
  });

  it('should not close dialog and keep focus on dropdown when pressing ESC', async () => {
    await e2e.clickOn(dialogTrigger);
    await e2e.clickOn(dropdownIndicator);

    await e2e.waitForSelectorAndPressKey(dropdownList, 'Escape');
    await e2e.exists(dropdownSelector);
  });

  it('should close when ESC pressed in the dialog', async () => {
    await e2e.clickOn(dialogTrigger);
    await e2e.clickOn(dropdownIndicator);

    await e2e.waitForSelectorAndPressKey(dropdownList, 'Escape');
    await e2e.exists(dropdownSelector);

    await e2e.clickOn(dialogHeader);
    await e2e.waitForSelectorAndPressKey(dialogHeader, 'Escape');
    await e2e.expectHidden(dropdownSelector);
  });

  it('should close when ESC pressed in the closed dropdown', async () => {
    await e2e.clickOn(dialogTrigger); // open dialog
    await e2e.focusOn(dropdownSelector);
    await e2e.waitForSelectorAndPressKey(dropdownSelector, 'ArrowDown'); // open list

    await e2e.waitForSelectorAndPressKey(dropdownList, 'Escape'); // closes list
    await e2e.waitForSelectorAndPressKey(dialogHeader, 'Escape'); // closes dialog
    await e2e.expectHidden(dropdownSelector);
    await e2e.expectHidden(dialogHeader);
  });
});
