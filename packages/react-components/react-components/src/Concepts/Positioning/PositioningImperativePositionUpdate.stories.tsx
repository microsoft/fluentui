import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface, PopoverProps } from '@fluentui/react-popover';
import { Button } from '@fluentui/react-button';
import { PopperRefHandle } from '@fluentui/react-positioning';

export const ImperativePositionUpdate = () => {
  const [loading, setLoading] = React.useState(true);
  const popperRef = React.useRef<PopperRefHandle>(null);
  const timeoutRef = React.useRef(0);

  const onOpenChange = React.useCallback<NonNullable<PopoverProps['onOpenChange']>>((e, data) => {
    if (!data.open) {
      setLoading(true);
    } else {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setLoading(false), 1000);
    }
  }, []);

  React.useEffect(() => {
    if (!loading) {
      popperRef.current?.updatePosition();
    }
  }, [loading]);

  React.useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  });

  return (
    <Popover positioning={{ position: 'below', popperRef }} noArrow onOpenChange={onOpenChange}>
      <PopoverTrigger>
        <Button appearance="primary">Click me</Button>
      </PopoverTrigger>

      <PopoverSurface style={{ minWidth: 100 }}>{loading ? 'Loading 1 second...' : <Placeholder />}</PopoverSurface>
    </Popover>
  );
};

ImperativePositionUpdate.parameters = {
  layout: 'padded',
  docs: {
    description: {
      story: [
        'The `popperRef` positioning prop provides an [imperative handle](https://reactjs.org/docs/hooks-reference.html#useimperativehandle)',
        'to reposition the positioned element. This can be useful for scenarios where content is dynamically loaded.',
        '',
        'In this example, you can move your mouse in the red boundary and the tooltip will follow the mouse cursor',
      ].join('\n'),
    },
  },
};

const Placeholder = () => (
  <div>
    <h4>Dynamic content</h4>

    <img src="https://fabricweb.azureedge.net/fabric-website/placeholders/400x400.png" />
  </div>
);
