import { selectors } from './toolbarMenu-example'

const beforeToolbarId = `#${selectors.beforeToolbarId}`
const afterToolbarId = `#${selectors.afterToolbarId}`
const menuTrigger = `#${selectors.triggerButtonId}`
const toolbarMenu = `.${selectors.toolbarMenu}`

describe('Toolbar menu on', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, menuTrigger)
  })

  it('TAB moves focus to next tabbable element after toolbar', async () => {
    // opens menu
    await e2e.clickOn(menuTrigger)
    expect(await e2e.exists(toolbarMenu)).toBe(true)

    // TAB from opened menu
    await e2e.pressKey('Tab')

    expect(await e2e.isFocused(afterToolbarId)).toBe(true)
    expect(await e2e.exists(toolbarMenu)).toBe(false)
  })

  it('Shift+TAB moves focus to previous tabbable element before toolbar', async () => {
    // opens menu
    await e2e.clickOn(menuTrigger)
    expect(await e2e.exists(toolbarMenu)).toBe(true)

    // Shift+TAB from opened menu
    await e2e.pressKey('Tab', 'Shift')

    expect(await e2e.isFocused(beforeToolbarId)).toBe(true)
    expect(await e2e.exists(toolbarMenu)).toBe(false)
  })
})
