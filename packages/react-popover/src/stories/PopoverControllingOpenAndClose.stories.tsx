import * as React from 'react';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Popover, PopoverTrigger, PopoverSurface, PopoverProps } from '@fluentui/react-popover';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Button } from '@fluentui/react-button';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { makeStyles } from '@fluentui/react-make-styles';

// FIXME need to redeclare types because type imports are under @ts-ignore
export type OpenPopoverEvents =
  | MouseEvent
  | TouchEvent
  | React.MouseEvent<HTMLElement>
  | React.KeyboardEvent<HTMLElement>
  | React.FocusEvent<HTMLElement>;

const useStyles = makeStyles({
  contentHeader: {
    marginTop: '0',
  },
});

const ExampleContent = () => {
  const styles = useStyles();
  return (
    <div>
      <h3 className={styles.contentHeader}>Popover content</h3>

      <div>This is some popover content</div>
    </div>
  );
};

export const ControllingOpenAndClose = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpenChange = (e: OpenPopoverEvents, data: { open: boolean }) => setOpen(data.open || false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpen(e.target.checked);
  };

  return (
    <div>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger>
          <Button>Controlled trigger</Button>
        </PopoverTrigger>
        <PopoverSurface>
          <ExampleContent />
        </PopoverSurface>
      </Popover>

      <label style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '10px' }}>
        open
        <input type="checkbox" name="state" value="open" checked={open} onChange={onChange} />
      </label>
    </div>
  );
};

ControllingOpenAndClose.parameters = {
  docs: {
    description: {
      story: [
        'The opening and close of the `Popover` can be controlled with your own state.',
        'The `onOpenChange` callback will provide the hints for the state and triggers based on the appropriate',
        'event.',
        '',
        '_When controlling the open state of the `Popover`, extra effort is required to ensure that interactions are_',
        '_still approriate and that keyboard accessibility does not degrade._',
      ].join('\n'),
    },
  },
};
