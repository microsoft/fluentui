import * as React from 'react';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogHeader,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '@fluentui/react-modern-components-preview/dialog';
import type { CheckboxOnChangeData } from '@fluentui/react-components';
import { Button, Checkbox } from '@fluentui/react-components';
import story from './DialogActions.md';

export const Actions = (): React.ReactNode => {
  const [checked, setChecked] = React.useState(false);
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>, data: CheckboxOnChangeData) => {
    setChecked(Boolean(data.checked));
  };

  return (
    <Dialog modalType="non-modal">
      <DialogTrigger>
        <Button>Open campaign dialog</Button>
      </DialogTrigger>
      <DialogSurface aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Delete this campaign?</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>
            You're about to delete the campaign group "Campaign name that goes up to two lines". This will also delete
            all associated campaign resources, including the overview page, files, publications, conversations, and so
            forth. Please back up any content you need before proceeding.
          </p>
          <Checkbox
            checked={checked}
            onChange={handleChange}
            label="Yes, delete this campaign and all its associated resources"
          />
        </DialogBody>
        <DialogActions>
          <DialogTrigger>
            <Button disabled={!checked} appearance="primary">
              Delete
            </Button>
          </DialogTrigger>
          <DialogTrigger>
            <Button appearance="secondary">Cancel</Button>
          </DialogTrigger>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  );
};

Actions.parameters = { docs: { description: { story } } };
