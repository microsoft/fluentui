import { PrimaryButton as V8Button, Dialog as V8Dialog, DialogFooter as V8DialogFooter } from '@fluentui/react';
import { Button as V9Button } from '@fluentui/react-components';
import * as React from 'react';

export const V8Example = () => {
  const [open, setOpen] = React.useState(false);
  const toggleHideDialog = () => setOpen(open => !open);

  return (
    <div style={{ margin: 50 }}>
      <V9Button onClick={toggleHideDialog}>Open V8 dialog</V9Button>

      <V8Dialog hidden={!open} onDismiss={toggleHideDialog}>
        <div style={{ display: 'flex', gap: 20, flexDirection: 'column' }}>
          <V8Button primary>v8 button</V8Button>
          <V9Button appearance="primary">v9 button</V9Button>
        </div>

        <V8DialogFooter>
          <V8Button onClick={toggleHideDialog} text="Cancel" />
        </V8DialogFooter>
      </V8Dialog>
    </div>
  );
};
