import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from './index';
import { Button } from './utils.stories';
import { ExampleContent } from './utils.stories';

export const InternalUpdateContent = () => {
  const [visible, setVisible] = React.useState(true);

  const changeContent = () => setVisible(false);

  return (
    <Popover>
      <PopoverTrigger>
        <Button>Popover trigger</Button>
      </PopoverTrigger>

      <PopoverSurface>
        <ExampleContent />

        {visible ? (
          <div>
            <Button onClick={changeContent}>Action</Button>
          </div>
        ) : (
          <div>The second panel</div>
        )}
      </PopoverSurface>
    </Popover>
  );
};
