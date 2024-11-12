import * as React from 'react';
import { Checkbox, Tooltip } from '@fluentui/react-components';
import type { CheckboxProps, PositioningImperativeRef } from '@fluentui/react-components';

export const WithArrowAndFallbackPositions = () => {
  const positioningRef = React.useRef<PositioningImperativeRef>(null);
  const [activeButton, setActiveButton] = React.useState<HTMLButtonElement>();
  const [boundaryRef, setBoundaryRef] = React.useState<HTMLDivElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [enableFallbackPositions, setEnableFallbackPositions] = React.useState(true);

  const onClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(true);
    setActiveButton(ev.currentTarget);
  };

  const onClickClose = () => {
    setOpen(false);
  };

  const onChangeEnableFallbackPositions: CheckboxProps['onChange'] = (_, { checked }) => {
    setEnableFallbackPositions(checked as boolean);
  };

  React.useEffect(() => {
    if (activeButton) {
      positioningRef.current?.setTarget(activeButton);
    }
  }, [activeButton, open]);

  return (
    <>
      <Tooltip
        withArrow
        visible={open}
        positioning={{
          positioningRef,
          flipBoundary: boundaryRef,
          overflowBoundary: boundaryRef,
          fallbackPositions: enableFallbackPositions ? ['below', 'before', 'after'] : undefined,
          arrowPadding: 10,
          align: 'top',
        }}
        content={
          <div>
            <p>
              Follows the cursor Follows the cursor Follows the cursor Follows the cursor Follows the cursor Follows the
              cursor Follows the cursor
            </p>
            <p>
              Follows the cursor Follows the cursor Follows the cursor Follows the cursor Follows the cursor Follows the
              cursor Follows the cursor
            </p>
            <p>
              Follows the cursor Follows the cursor Follows the cursor Follows the cursor Follows the cursor Follows the
              cursor Follows the cursor
            </p>
            <p>
              Follows the cursor Follows the cursor Follows the cursor Follows the cursor Follows the cursor Follows the
              cursor Follows the cursor
            </p>
            <p>
              Follows the cursor Follows the cursor Follows the cursor Follows the cursor Follows the cursor Follows the
              cursor Follows the cursor
            </p>
            <p>
              Follows the cursor Follows the cursor Follows the cursor Follows the cursor Follows the cursor Follows the
              cursor Follows the cursor
            </p>
            <p>
              Follows the cursor Follows the cursor Follows the cursor Follows the cursor Follows the cursor Follows the
              cursor Follows the cursor
            </p>
          </div>
        }
        relationship="label"
      />

      <button style={{ position: 'fixed', marginBlock: '5px', top: 10, left: 70 }} onClick={onClickClose}>
        Close tooltip
      </button>

      <Checkbox
        style={{
          position: 'fixed',
          top: 10,
          left: 200,
          alignContent: 'center',
        }}
        label="Enable fallback positions"
        checked={enableFallbackPositions}
        onChange={onChangeEnableFallbackPositions}
      />

      <div
        ref={setBoundaryRef}
        style={{
          position: 'fixed',
          top: 50,
          left: 50,
          right: 50,
          bottom: 50,
          display: 'grid',
          justifyContent: 'space-between',
          alignContent: 'space-between',
          alignItems: 'flex-start',
          border: '2px dashed red',
          resize: 'horizontal',
          overflow: 'auto',
        }}
      >
        <button style={{ gridRow: 1, margin: '10px' }} onClick={onClick}>
          Button 1
        </button>
        <button style={{ gridRow: 1, margin: '10px' }} onClick={onClick}>
          Button 2
        </button>
        <button style={{ gridRow: 1, margin: '10px' }} onClick={onClick}>
          Button 3
        </button>
        <button style={{ gridRow: 2, margin: '10px' }} onClick={onClick}>
          Button 4
        </button>
        <button style={{ gridRow: 2, margin: '10px' }} onClick={onClick}>
          Button 5
        </button>
        <button style={{ gridRow: 2, margin: '10px' }} onClick={onClick}>
          Button 6
        </button>
        <button style={{ gridRow: 3, margin: '10px' }} onClick={onClick}>
          Button 7
        </button>
        <button style={{ gridRow: 3, margin: '10px' }} onClick={onClick}>
          Button 8
        </button>
        <button style={{ gridRow: 3, margin: '10px' }} onClick={onClick}>
          Button 9
        </button>
      </div>
    </>
  );
};

WithArrowAndFallbackPositions.parameters = {
  docs: {
    description: {
      story: 'The `withArrow` prop causes the tooltip to have an arrow pointing to its target.',
    },
  },
};
