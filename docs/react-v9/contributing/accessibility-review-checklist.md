This accessibility review checklist is primarily geared towards evaluating the accessibility of new components, or major design changes or new features in existing components. Detailed steps are included in the section for each high-level item. Skip any tests or sub-tests that you do not feel comfortable evaluating, and either pair with or hand off the issue to an accessibility SME for any remaining items.

> Note: these checks are geared towards catching component-level accessibility issues. They are not comprehensive, and this is not the correct checklist for evaluating page- or app-level accessibility.

- [ ] Color contrast: the text meets required contrast, and all states (e.g. selected, focus, etc) meet 3:1 contrast
- [ ] High contrast mode: the control is understandable in high contrast mode in all states
- [ ] Zoom and reflow: the control is still visible and functional when zoomed in
- [ ] Pointer access: hover states are not required to understand or operate the control
- [ ] Keyboard access: all features can be operated using the keyboard, using established patterns. To determine that a keyboard pattern is established, it should match the closest APG pattern when possible, or have an articulated reason behind the pattern if not.
- [ ] Code conformance: meets requirements in ARIA spec and ARIA in HTML
- [ ] Screen reader access: the control is understandable and operable with all the following screen readers, following established patterns for that control with that screen reader
  - [ ] JAWS + Chrome or Edge
  - [ ] NVDA + Chrome or Edge
  - [ ] NVDA + Firefox
  - [ ] Narrator + Edge
  - [ ] VoiceOver + Safari, iOS
  - [ ] VoiceOver + Safari, macOS
  - [ ] Talkback + Chrome on Android

## Testing Notes

For each component tested, write out any specific notes per-step here. Use this section to communicate any non-standard approaches, ambiguous test results, or fully skipped sections.

---

## Color contrast

### Steps

1. Find all the states of the component (hover, pressed, disabled, open/closed, selected, etc) that affect the visual presentation. For each state, check the following:
   - Text contrast
   - Contrast of any other meaningful visual information (e.g. icons, boundary of text inputs/buttons, etc.)
   - Focus indicator contrast
   - If the state is meaningful (focus, selected, error, etc.), check that the state itself has a contrasting difference vs. the rest state.
2. Find all permutations of props and children that affect visual presentation. For example, if a selectable gridcell can contain links, test the link text contrast against both the rest state and selected state.

### Checks

- [ ] Check text contrast: text should have a 4.5:1 contrast ratio against its background. Large text (over 24px) only needs a 3:1 contrast ratio. Any control in a disabled state is excepted.
- [ ] Check contrast of other meaningful visual information: non-text information needs to meet 3:1 contrast against its background
  - What is meaningful visual info?: any graphical object -- whether icons, borders, underlines, or any other visually rendered item -- that would substantively impact a user's ability to understand the UI if it were taken away. One example of this is the border of an input, since a user would almost certainly not be able to understand that something is a text input without its border.
  - What part of a graphical object needs to meet contrast?: the quick check is to erase every pixel that does not meet 3:1 contrast, and ask if a user can understand and interact with the control with equivalent ease and efficiency.
- [ ] Check the focus indicator: for any item that can gain keyboard focus through the tab key or any other interaction, verify that the focus indicator meets 3:1 contrast
  - The focus indicator needs to have 3:1 contrast against both the background, and against the rest (non-focused) state.
  - Be extra careful to verify the focus indicator both against the base state, and against other states like selected or pressed
  - If the control can contain focusable children like buttons or links, make sure to test those children's focus indicators as well. This is mostly relevant if the control has a different background color than the default page background (including in other states, like selected/pressed/etc).
- [ ] Compare state vs. rest state: in addition to text/graphics needing contrast within each state, some states also need contrast against each other.
  - Where this applies: focus (alread covered), and also states with meaning: selection, on/off states, checked, error, etc. Hover and mousedown/CSS ":pressed" do not count here.
  - Check states against the rest state, and also each other. For example, if the only visual indication of selection is a background color change, that color change must be at least 3:1 against the rest state, and also against the focus state, error state, etc.
  - If there are multiple indications of a state (e.g. a slight background color change + a check mark), only one needs to meet 3:1 contrast.

### References

- [WebAIM contrast checker](https://webaim.org/resources/contrastchecker/)
- [Text contrast requirement](https://w3c.github.io/wcag/guidelines/22/#contrast-minimum)
- [Non-text contrast requirement](https://w3c.github.io/wcag/guidelines/22/#non-text-contrast)
- [In-depth dive on WCAG's non-text contrast req with examples](https://codepen.io/smhigley/full/XWbyGbv) (note: we may choose a higher bar than WCAG, especially on some of the edge cases)
- [Color contrast analyzer](https://chrome.google.com/webstore/detail/color-contrast-analyzer/dagdlcijhfbmgkjokkjicnnfimlebcll) (helps with non-text contrast)
- [axe-core devtools extension](https://www.deque.com/axe/browser-extensions/) (includes automated text contrast checking, but not non-text contrast)

---

## High Contrast Mode

### Steps

1. Turn on Windows high contrast mode (must be tested in Windows, browser extensions do not apply)
2. For all steps, check at least one light and one dark theme. For Windows 11, this means one theme with dark text on a light bg, and one theme with light text on a dark bg
3. Find all permutations of state, props, and children that affect the visual presentation. For each, check the following:
   - All text and meaningful graphics are visible
   - All states are easy to perceive an understand (e.g. a selected tab looks like a selected tab)
   - Colors that have semantic meaning are used correctly, where applicable
   - There are no large areas of the screen where the chosen text/background color is overridden or inverted

### Checks

- [ ] Text and meaningful graphics are visible: this one is easy. Just make sure nothing meaningful has disappeared.
- [ ] States are easy to perceive/understand: similar to color contrast, make sure that all meaningful states (focus, selection, error, etc) are still distinguishable in high contrast mode.
- [ ] Semantic colors: this applies to states and elements that correspond _directly_ to the HCM color meanings. So a disabled button uses the disabled control color, and links use link color. This is nowhere near as strict as ARIA semantics, and there's room for squishiness and interpretation -- essentially, use best judgement. Some caveats:
  - Semantic colors can be re-used in other places as well, within reason. Don't make a working control use the disabled color, but it's fine to use the text highlight color for selection or hover (though hover isn't necessary).
  - If there are meaningful colors in the original used in small places (e.g. a green available icon and red busy icon), it's fine (probably best) to keep using those colors in HCM.
- [ ] No overriding large areas: small inversions of text/bg are sometimes necessary (e.g. inverting colors for the current tab button), but this absolutely should not be present on a large % of the screen. E.g. in a dark HCM theme, there should be no large areas of white. Imagine you're light sensitive (either to any bright light, or something specific like blue-tinted light), and then check that there would be no painful surprises in our UI in high contrast mode.

### References

- [List of system color keywords](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#system_colors)
- [Quick Tips for High Contrast Mode](https://sarahmhigley.com/writing/whcm-quick-tips/)

---

## Zoom and Reflow

### Steps

1. Open a window with only the control (e.g. no Storybook panels or UI)
2. Use some combination of window resizing and zoom to set the brower viewport to 320px by 256px
3. Find all permutations of state, props, and children that affect layout (e.g. opening a combobox, or expanding multiple levels of dropdown menus), and check that the control is visually and functionally coherent.
4. If the control accepts any freeform text content (via children, slots, or props), create a test case that inserts and absurdly long text string in all possible places, and then do steps 1-3.

### Checks

- [ ] No information is lost: at smaller screen sizes or with larger text, all meaningful text, graphics, and layout should be preserved. An example of meaningful layout would be the column/row alignment in a calendar.
- [ ] It is not substationally more difficult to use the control or access meanintful information. As an example: collapsing side-by-side day-and-month pickers to a single grid the toggles between days and months is fine, because it's not a frequently needed interaction. In contrast, if every navigation link in a nav list gets truncated and must be separately hovered to read, that would be substantionally more difficult.
- [ ] There is no horizontal scrolling, with the exception of semantic tables/grids. Other exceptions should be written down in the testing notes, and discussed.

### References

- [Reflow WCAG criterion](https://w3c.github.io/wcag/understanding/reflow.html)

---

## Pointer access

### Steps

1. Use a touchscreen, if available, to operate the control.

### Checks

- If there are no hover states, or the only hover state is a color change, skip this section.
- [ ] Verify that hover isn't needed to understand the control, or access any of its functionality.
- [ ] If visual cues are hidden behind a hover state, those cues should not be at all needed to understand the control (e.g. no important tooltips that rely on hover).

If a touchscreen isn't available, use common sense/maybe devtools? to mimic a lack of hover.

Note -- this is not only about touch access. A number of assistive tech devices function like a pointer, but lack hover (e.g. eye control or switch control).

---

## Keyboard access

### Steps

1. Using only a keyboard (and not a screen reader), perform all available interactions on the control. For each component state and interaction, check the following:
   - The interaction can be performed with roughly equivalent efficiency between mouse and keyboard
   - Keyboard focus through tab/arrow keys only goes to elements with interactive roles
   - All visual information available with a mouse is also available with the keyboard
2. For each separate control that has internally managed keyboard handling (including through tabster), make note of the overall tab/arrow/etc. behavior
   - Compare the overall keyboard interaction to the expected keyboard interaction based on the control's semantics

### Checks

- [ ] Keyboard vs. mouse efficiency: While some page-level keyboard interaction (e.g. jumping to a specific link) takes more time with a keyboard, individual control-level tasks like opening a tab or selecting a combobox option should be about as efficient with each. The specific actions taken don't need to be literally the same (e.g. resizing could be done through dragging or through a menu), but each available task should be about as easy to do with a keyboard.
- [ ] Focus and interactive roles: A user should not tab or otherwise move their keyboard focus to an element that would not be expected to get focused.
  - Example: a regular `<span tabindex="0">some text</span>` should not have a tabindex and should not get focus, even if it has a tooltip or a click event (that would be a separate issue).
  - The ARIA spec has a [list of interactive roles](https://w3c.github.io/aria/#widget_roles)
  - Programmatically called focus can sometimes go to non-interactive roles. When that is the case, do both of the following:
    1.  List all instances where this happens in the github issue for this test
    2.  Verify that the focused element has an accessible name, and is [one of these roles](https://w3c.github.io/aria/#namefromauthor)
- [ ] Visual information is accessible with the keyboard:
  - Check for any information that shows up on hover (e.g. icons that appear on hover, or tooltips). Verify that these either show on focus, or that the information they convey is otherwise accessible to keyboard users.
  - In this case, "accessible" means that a keyboard-only user would reasonably be aware that information or actions are available to them at the time they are relevant. Creating a custom keyboard shortcut to show a tooltip does not meet this.
  - This is a purely visual test (no screen readers), so screen-reader-only information does not matter in this test.
  - This does not mean that an icon as ubiquitous as a close "x" requires a tooltip 😁
- [ ] Compare the keyboard interaction pattern to what is expected based on semantics:
  - To find expectations based on semantics, the [APG](https://www.w3.org/WAI/ARIA/apg/) has tables of keyboard behavior on individual example pages (and descriptions in the main document
  - The APG is **not a spec, and not a hard requirement**. There may be valid reasons we differ from them. Differences should be noted and listed in the github issue for this test.

### References

- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [List of interactive ARIA roles](https://w3c.github.io/aria/#widget_roles) (note: these can be implicit based on the HTML element)

---

## Code conformance

### Steps

1. Find all the states of the component (hover, focus, pressed, open/closed, selected, etc) that affect the accessibility tree. For each state, do the following:
   - Run automated tests ([axe-core](https://www.deque.com/axe/browser-extensions/) in devtools or the [accessibility insights](https://accessibilityinsights.io/en/downloads/) extension)
   - Manually verify semantics are appropriate
2. Find all permutations of props and children that affect the accessibility tree. For each, do step 1 again.
3. Find all instances of built-in visually hidden text, and verify they follow our localization pattern

### Checks

To check for valid semantics, look at the following:

- [ ] Check that any ARIA attributes are appropriate for the element/role they are on, and there are no missing attributes
- [ ] Check that all ARIA roles are appropriate for the elements they are applied to
- [ ] Verify that the ARIA role hierarchy is correct ( roles may be explicit through the `role=""` attribute, or implicit based on the HTML element)
- [ ] Check that the accessible name and description are present where needed, and set to appropriate text in the tested example (update the example if it has missing or incorrect labels or descriptions). Also check that an accessible name is not present on elements that do not support having an accessible name
- [ ] Check that all semantics match the visual presentation and interaction/functionality of the control

To check for visually-hidden text:

- [ ] Look for icons and graphics, `aria-label`s set within the component code, and any freeform string props that do not visually show up
- [ ] For any strings that are required to be present for the accessibility reasons (e.g. icon button labels), the string _must_ come from our own props, following our [internationalization pattern](https://github.com/microsoft/fluentui/pull/19258). It should not be up to authors to know they need to manually set an `aria-label` or other native attribute.

### References

- [ARIA spec](https://w3c.github.io/aria/)
- [List of elements that support an accessible name](https://w3c.github.io/aria/#namefromauthor)
- [ARIA in HTML](https://w3c.github.io/html-aria/)

---

## Screen reader access

Screen reader combinations:

1. Windows screen readers:
   - JAWS + Chrome or Edge
   - NVDA + Chrome or Edge
   - NVDA + Firefox
   - Narrator + Edge
2. macOS:
   - VoiceOver + Safari
   - (Optional): VoiceOver + Chrome (since all Electron apps effectively use Chrome, which affects VoiceOver)
3. Touch screen readers:
   - iOS VoiceOver + Safari
   - Android Talkback + Chrome

### Steps

For Windows screen readers:

1. Use the screen reader solely in virtual cursor/scan mode/browse mode
2. Use the screen reader relying fully on automatic mode changes

For VoiceOver on macOS:

1. Navigate item-by-item through the entire control
2. Use the rotor to jump to all relevant element types
3. Tab or use available keyboard interactions to navigate through all interactive items

Touch screen readers:

1. Swipe through the entire control item-by-item
2. Use the rotor/shortcuts to jump by element type, where applicable in the control
3. Use touch exploration for all elements present on the control in all control states

### Checks

For all screen readers, within all screen-reader-specific tests, check the following:

- All visual text and non-presentational graphics and icons are available with the screen reader
  - [ ] JAWS + Chrome or Edge
  - [ ] NVDA + Chrome or Edge
  - [ ] NVDA + Firefox
  - [ ] Narrator + Edge
  - [ ] VoiceOver + Safari, iOS
  - [ ] VoiceOver + Safari, macOS
  - [ ] Talkback + Chrome on Android
- All information conveyed through visual cues is presented to the screen reader (e.g. that a field is in an error state, or that a change happened after an interaction)
  - [ ] JAWS + Chrome or Edge
  - [ ] NVDA + Chrome or Edge
  - [ ] NVDA + Firefox
  - [ ] Narrator + Edge
  - [ ] VoiceOver + Safari, iOS
  - [ ] VoiceOver + Safari, macOS
  - [ ] Talkback + Chrome on Android
- The names and roles of all navigable elements are appropriate, and match the visual presentation
  - [ ] JAWS + Chrome or Edge
  - [ ] NVDA + Chrome or Edge
  - [ ] NVDA + Firefox
  - [ ] Narrator + Edge
  - [ ] VoiceOver + Safari, iOS
  - [ ] VoiceOver + Safari, macOS
  - [ ] Talkback + Chrome on Android
- All states are announced appropriately for the specific screen reader and control, and match visual presentation
  - [ ] JAWS + Chrome or Edge
  - [ ] NVDA + Chrome or Edge
  - [ ] NVDA + Firefox
  - [ ] Narrator + Edge
  - [ ] VoiceOver + Safari, iOS
  - [ ] VoiceOver + Safari, macOS
  - [ ] Talkback + Chrome on Android
- The interactions available through the screen reader match what is expected for each specific interactive control, based on the expectations for each specific screen reader.
  - [ ] JAWS + Chrome or Edge
  - [ ] NVDA + Chrome or Edge
  - [ ] NVDA + Firefox
  - [ ] Narrator + Edge
  - [ ] VoiceOver + Safari, iOS
  - [ ] VoiceOver + Safari, macOS
  - [ ] Talkback + Chrome on Android
- Changes that should be announced asynchronously are announced through a live region. Changes that do not need a live region do not use one.
  - [ ] JAWS + Chrome or Edge
  - [ ] NVDA + Chrome or Edge
  - [ ] NVDA + Firefox
  - [ ] Narrator + Edge
  - [ ] VoiceOver + Safari, iOS
  - [ ] VoiceOver + Safari, macOS
  - [ ] Talkback + Chrome on Android

Specific per-screen-reader checks:

1. Windows
   - When tabbing or otherwise moving focus, without manually changing modes, auto-mode-changes occur as expected for the focused element
     - [ ] JAWS + Chrome or Edge
     - [ ] NVDA + Chrome or Edge
     - [ ] NVDA + Firefox
     - [ ] Narrator + Edge
   - While relying on auto-mode-changes, all custom managed keyboard interaction is available (except for known screen-reader-specific mode change bugs)
     - [ ] JAWS + Chrome or Edge
     - [ ] NVDA + Chrome or Edge
     - [ ] NVDA + Firefox
     - [ ] Narrator + Edge
   - While staying solely in virtual cursor/scan mode/browse mode, all information and interactions are available (exception: some form controls require forms/application mode to operate, and this is expected. Mostly applies to combobox and tree.)
     - [ ] JAWS + Chrome or Edge
     - [ ] NVDA + Chrome or Edge
     - [ ] NVDA + Firefox
     - [ ] Narrator + Edge
   - All relevant component-type shortcuts (e.g. "c" for comboboxes) bring the cursor to the correct element
     - [ ] JAWS + Chrome or Edge
     - [ ] NVDA + Chrome or Edge
     - [ ] NVDA + Firefox
     - [ ] Narrator + Edge
   - item-by-item navigation reaches all relevant elements
     - [ ] JAWS + Chrome or Edge
     - [ ] NVDA + Chrome or Edge
     - [ ] NVDA + Firefox
     - [ ] Narrator + Edge
2. macOS
   - [ ] Check that using the rotor brings the VO cursor to the correct place
   - [ ] Check that no shortcuts are missing from the rotor
3. Touch
   - When swiping, pay extra attention to any popups, menus, tooltips, dialogs, etc. -- ensure that their contents are accessible via swiping
     - [ ] VoiceOver + Safari, iOS
     - [ ] Talkback + Chrome on Android
   - Using the rotor/talkback shortcuts to jump to a specific type of element puts the cursor on the correct element
     - [ ] VoiceOver + Safari, iOS
     - [ ] Talkback + Chrome on Android
   - No element-specific shortcuts should be missing from the VO rotor/talkback
     - [ ] VoiceOver + Safari, iOS
     - [ ] Talkback + Chrome on Android
   - Touch exploration should surface all available items (if there are menus/popups/etc, make sure to test both open and closed states)
     - [ ] VoiceOver + Safari, iOS
     - [ ] Talkback + Chrome on Android
   - Touch exploration should match screen reader announcements with visual items and placement. For example: a checkbox or slider should be findable with the screen reader in the same area it is visually rendered.
     - [ ] VoiceOver + Safari, iOS
     - [ ] Talkback + Chrome on Android

### References

This test requires a broad knowledge of screen readers; specific references won't be too helpful. This should generally be done with or by someone who is confident in using and interpreting screen readers.
