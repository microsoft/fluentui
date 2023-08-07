import * as React from 'react';
import { makeStyles, Button, Popover, PopoverSurface, PopoverTrigger, useId } from '@fluentui/react-components';
import type { PopoverProps } from '@fluentui/react-components';

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

export const InternalUpdateContent = () => {
  const id = useId();
  const [visible, setVisible] = React.useState(false);

  const changeContent = () => setVisible(true);
  const onOpenChange: PopoverProps['onOpenChange'] = (e, data) => {
    if (data.open === false) {
      setVisible(false);
    }
  };

  return (
    <Popover onOpenChange={onOpenChange}>
      <PopoverTrigger disableButtonEnhancement>
        <Button>Popover trigger</Button>
      </PopoverTrigger>

      <PopoverSurface id={id} aria-labelledby={id}>
        <ExampleContent />

        {visible ? (
          <div>The second panel</div>
        ) : (
          <div>
            <Button onClick={changeContent}>Action</Button>
          </div>
        )}
      </PopoverSurface>
    </Popover>
  );
};
