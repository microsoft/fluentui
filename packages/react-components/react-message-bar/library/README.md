# @fluentui/react-message-bar

The MessageBar component communicates important information about the state of the entire application or surface.
For example, the status of a page, panel, dialog or card. The information shouldn't require someone
to take immediate action, but should persist until the user performs one of the required actions.

```tsx

import { MessageBar, MessageBarTitle, MessageBarBody, Button } from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';

function Example() {
  return (
    <MessageBar>
      <MessageBarBody>
        <MessageBarTitle>Descriptive title</MessageBarTite>
        This is a message bar

        <MessageBarActions containerAction={<Button arial-label="dismiss" icon={<DismissReguladr />} />}>
          <Button>Action</Button>
          <Button>Action</Button>
        </MessageBarActions>
      </MessageBarBody>
    </MessageBar>
  )
}
```

## Opt-in CSS Modules styles

Message bars, titles, actions, and groups have layered CSS Modules alternatives beside their Griffel style hooks.
Resolve the relevant `.styles.js` imports to `.styles.css.js` (and source `.styles`
imports to `.styles.css.ts`) only in an explicitly opted-in bundler configuration.
Keep CSS assets and process the headless icon stylesheet in the `fluentui` layer.
The default component imports and Griffel implementations are unchanged.
