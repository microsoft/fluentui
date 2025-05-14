import * as React from 'react';
import type { Meta } from '@storybook/react';
import { usePositioning, useSafeZoneArea, type PositioningProps } from '@fluentui/react-positioning';
import { useMergedRefs } from '@fluentui/react-utilities';

const Example = ({
  containerHeight = 400,

  popoverWidth = 150,
  popoverHeight = 300,

  positioning,
  triggerStyle,
}: {
  containerHeight?: number;

  popoverHeight?: number;
  popoverWidth?: number;

  positioning: Pick<PositioningProps, 'align' | 'position' | 'offset'>;
  triggerStyle?: React.CSSProperties;
}) => {
  const safeZoneArea = useSafeZoneArea({ debug: true, timeout: 100000 });
  const { containerRef, targetRef } = usePositioning(positioning);

  return (
    <div
      style={{
        position: 'relative',
        width: '400px',
        height: containerHeight,
        background: 'lightgray',
        border: '2px dashed black',
      }}
    >
      <button
        ref={useMergedRefs(targetRef, safeZoneArea.targetRef)}
        className="trigger"
        style={{
          ...triggerStyle,
          cursor: 'pointer',
          position: 'absolute',
          width: '100px',
          height: '80px',
        }}
      >
        TRIGGER
      </button>
      <div
        data-popper-placement="right-top"
        className="popover"
        ref={useMergedRefs(containerRef, safeZoneArea.containerRef)}
        style={{
          backgroundColor: 'orange',
          border: '2px solid black',
          position: 'absolute',
          padding: '20px',
          width: popoverWidth,
          height: popoverHeight,
        }}
      >
        POPOVER
      </div>
      {safeZoneArea.elementToRender}
    </div>
  );
};

const BoundaryRect = () => {
  const [popoverHeight, setPopoverHeight] = React.useState(300);

  return (
    <>
      <div style={{ display: 'flex', gap: 20, background: 'lightcyan', padding: '20px' }}>
        <button onClick={() => setPopoverHeight(200)}>height 200</button>
        <button onClick={() => setPopoverHeight(300)}>height 300</button>
      </div>

      <div style={{ display: 'grid', gap: 20, gridTemplateColumns: '1fr 1fr', placeItems: 'center' }}>
        {/* left */}
        <Example
          triggerStyle={{ left: 50, top: 150 }}
          popoverHeight={popoverHeight}
          positioning={{ align: 'center', position: 'after', offset: { mainAxis: 20 } }}
        />
        {/* right */}
        <Example
          triggerStyle={{ right: 50, top: 150 }}
          popoverHeight={popoverHeight}
          positioning={{ align: 'center', position: 'before', offset: { mainAxis: 20 } }}
        />

        {/* top */}
        <Example
          containerHeight={500}
          triggerStyle={{ left: 50, top: 400 }}
          popoverHeight={popoverHeight}
          positioning={{ align: 'center', position: 'above', offset: { mainAxis: 20 } }}
        />
        {/* bottom */}
        <Example
          containerHeight={500}
          triggerStyle={{ left: 50, top: 50 }}
          popoverHeight={popoverHeight}
          positioning={{ align: 'center', position: 'below', offset: { mainAxis: 20 } }}
        />
      </div>
    </>
  );
};

export default {
  title: 'Positioning (safe area)',

  decorators: [
    story => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          margin: '20px',
        }}
      >
        {story()}
      </div>
    ),
  ],
} satisfies Meta<'div'>;

export const _BoundaryRect = () => <BoundaryRect />;
_BoundaryRect.storyName = 'using boundary rect';
