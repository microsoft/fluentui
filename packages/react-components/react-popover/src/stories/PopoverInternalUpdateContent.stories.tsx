import * as React from 'react';
import { Button } from '@fluentui/react-button';
import { makeStyles } from '@griffel/react';

import { Popover, PopoverProps, PopoverTrigger, PopoverSurface } from '../index';

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
  const [visible, setVisible] = React.useState(false);

  const changeContent = () => setVisible(true);
  const onOpenChange: PopoverProps['onOpenChange'] = (e, data) => {
    if (data.open === false) {
      setVisible(false);
    }
  };

  return (
    <Popover onOpenChange={onOpenChange}>
      <PopoverTrigger>
        <Button>Popover trigger</Button>
      </PopoverTrigger>

      <PopoverSurface>
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
