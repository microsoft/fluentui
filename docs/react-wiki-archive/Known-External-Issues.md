This page is a single place to check for known external bugs that affect Fluent UI.

## Browsers

### Chromium

- Chromium invisible focus in overflow: https://bugs.chromium.org/p/chromium/issues/detail?id=765750
- Chromium forced-colors SVG fill: https://bugs.chromium.org/p/chromium/issues/detail?id=1164162 (current css spec blocker: https://github.com/w3c/csswg-drafts/issues/6773)
- :active styles are applied to buttons even if mouse is not hovering over button, and onclick handle won't fire https://bugs.chromium.org/p/chromium/issues/detail?id=1323294

### Edge

(these include only bugs that are specific to Edge, not Chromium)

- Grid and table roles not mapped to UIA: https://microsoft.visualstudio.com/Edge/_workitems/edit/32476207
- aria-current not mapped in UIA: https://microsoft.visualstudio.com/Edge/_workitems/edit/33591365 (fixed)
- aria-colindex broken in Canary: https://microsoft.visualstudio.com/Edge/_workitems/edit/33627103 (fixed)
- aria-describedby with status/alert not mapped to UIA: https://microsoft.visualstudio.com/Edge/_workitems/edit/34929620 (done, verified v98+)
- autofill popup displayed over combobox, and overrides alt+down: https://microsoft.visualstudio.com/Edge/_workitems/edit/38834708
- readonly=true always mapped to UIA on gridcells: https://microsoft.visualstudio.com/Edge/_workitems/edit/39068928

## Screen Readers

### Narrator

- Not reading expand/collapse changes on columnheaders: https://microsoft.visualstudio.com/OS/_workitems/edit/36555706. New bug: https://microsoft.visualstudio.com/OS/_workitems/edit/35987679
- aria-current: https://microsoft.visualstudio.com/OS/_workitems/edit/37731933
- Not reading random buttons/content in scan mode in a dialog: https://microsoft.visualstudio.com/OS/_workitems/edit/38403779/
- Narrator skips the first item in scan mode from a focused container role: https://microsoft.visualstudio.com/OS/_workitems/edit/39043405

### JAWS

- JAWS 2021 and 2022 alertdialog: https://github.com/FreedomScientific/VFO-standards-support/issues/588

### NVDA

- NVDA + Chrome/Edge spinbutton role: https://github.com/nvaccess/nvda/issues/13195

### Talkback

- Talkback doesn't read option group label: https://issuetracker.google.com/issues/225987035

## Libraries/Other

### axe-core (used by Accessibility Insights)

- combobox/required children issue: https://github.com/dequelabs/axe-core/issues/2505
- treegrid aria-posinset/aria-setsize: https://github.com/dequelabs/axe-core/issues/2794
- false positive for role="main" inside role="document" in a modal: https://github.com/dequelabs/axe-core/issues/3359
