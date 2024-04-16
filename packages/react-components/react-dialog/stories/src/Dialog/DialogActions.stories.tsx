import * as React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
  Checkbox,
  CheckboxOnChangeData,
} from '@fluentui/react-components';
import story from './DialogActions.md';

export const Actions = () => {
  const [checked, setChecked] = React.useState(false);
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>, data: CheckboxOnChangeData) => {
    setChecked(Boolean(data.checked));
  };
  return (
    <Dialog modalType="non-modal">
      <DialogTrigger disableButtonEnhancement>
        <Button>Open campaign dialog</Button>
      </DialogTrigger>
      <DialogSurface aria-describedby={undefined}>
        <DialogBody>
          <DialogTitle>Delete this campaign?</DialogTitle>
          <DialogContent>
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
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button disabled={!checked} appearance="primary">
                Delete
              </Button>
            </DialogTrigger>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Cancel</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

Actions.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
