import { selectors } from './popupInToolbarMenu-example'

const toolbarMenuId = `.${selectors.toolbarMenu}`
const menuButtonId = `#${selectors.menuButtonId}`
const popupTriggerId = `#${selectors.popupTriggerId}`
const popupElementId = `#${selectors.popupElementId}`
const dummyButtonId = `#${selectors.dummyButtonId}`

describe('Popup in ToolbarMenu', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, menuButtonId)
  })

  it('Popup can be opened using mouse', async () => {
    // opens menu
    await e2e.clickOn(menuButtonId)
    expect(await e2e.exists(toolbarMenuId)).toBe(true)

    // opens Popup
    await e2e.clickOn(popupTriggerId)

    expect(await e2e.exists(popupElementId)).toBe(true)
  })

  it('Popup can be opened using keyboard', async () => {
    // focuses menu button
    await e2e.pressKey('Tab')

    // opens menu
    await e2e.pressKey('Enter')
    expect(await e2e.exists(toolbarMenuId)).toBe(true)

    // opens Popup
    await e2e.pressKey('Enter')

    expect(await e2e.exists(popupElementId)).toBe(true)
  })

  it('Opening Popup results in first element to be focused', async () => {
    // opens menu
    await e2e.clickOn(menuButtonId)
    expect(await e2e.exists(toolbarMenuId)).toBe(true)

    // opens Popup
    await e2e.clickOn(popupTriggerId)

    expect(await e2e.isFocused(popupElementId)).toBe(true)
  })

  it('Tab when Popup is focused does not result in hiding the Popup', async () => {
    // opens menu
    await e2e.clickOn(menuButtonId)
    expect(await e2e.exists(toolbarMenuId)).toBe(true)

    // opens Popup
    await e2e.clickOn(popupTriggerId)

    await e2e.pressKey('Tab')

    expect(await e2e.exists(popupElementId)).toBe(true)
  })

  it('Click inside Popup does not hide Popup', async () => {
    // opens menu
    await e2e.clickOn(menuButtonId)
    expect(await e2e.exists(toolbarMenuId)).toBe(true)

    // opens Popup
    await e2e.clickOn(popupTriggerId)

    await e2e.clickOn(popupElementId)

    expect(await e2e.exists(popupElementId)).toBe(true)
  })

  it('Popup is closed when clicking outside of menu and popup', async () => {
    // opens menu
    await e2e.clickOn(menuButtonId)
    expect(await e2e.exists(toolbarMenuId)).toBe(true)

    // opens Popup
    await e2e.clickOn(popupTriggerId)

    await e2e.clickOn(dummyButtonId)

    expect(await e2e.exists(popupElementId)).toBe(false)
    expect(await e2e.exists(popupTriggerId)).toBe(false)
  })

  it('Click outside of Popup but inside of Menu closes Popup but leaves Menu open', async () => {
    // opens menu
    await e2e.clickOn(menuButtonId)
    expect(await e2e.exists(toolbarMenuId)).toBe(true)

    // opens Popup
    await e2e.clickOn(popupTriggerId)

    await e2e.clickOn(popupTriggerId)

    expect(await e2e.exists(popupElementId)).toBe(false)
    expect(await e2e.exists(popupTriggerId)).toBe(true)
  })
})
