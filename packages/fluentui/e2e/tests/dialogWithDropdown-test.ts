import { selectors } from './dialogWithDropdown-example';
import { dropdownSlotClassNames } from '@fluentui/react-northstar';

const outerTrigger = `#${selectors.outerTrigger}`;
const dropdownSelector = `#${selectors.dropdown}`;
const dialogHeader = `#${selectors.dialogHeader}`;
const dropdownIndicator = `.${dropdownSlotClassNames.toggleIndicator}`;

describe('Dialog scroll', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, outerTrigger);
  });

  it('should render with dropdown', async () => {
    await e2e.clickOn(outerTrigger);
    expect(await e2e.exists(dropdownSelector)).toBe(true);
  });

  it('should not close dialog and keep focus on dropdown when pressing ESC', async () => {
    await e2e.clickOn(outerTrigger);
    await e2e.clickOn(dropdownIndicator);
    await e2e.pressKey('Escape');
    expect(await e2e.exists(dropdownSelector)).toBe(true);
  });

  it('should close when ESC pressed in the dialog', async () => {
    await e2e.clickOn(outerTrigger);
    await e2e.clickOn(dropdownIndicator);
    await e2e.pressKey('Escape');
    expect(await e2e.exists(dropdownSelector)).toBe(true);
    await e2e.clickOn(dialogHeader);
    await e2e.pressKey('Escape');
    expect(await e2e.exists(dropdownSelector)).toBe(false);
  });
});
