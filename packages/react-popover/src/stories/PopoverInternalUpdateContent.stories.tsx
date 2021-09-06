import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface, PopoverProps } from '@fluentui/react-popover';
import { Button } from '@fluentui/react-button';
import { ExampleContent } from './utils.stories';

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
