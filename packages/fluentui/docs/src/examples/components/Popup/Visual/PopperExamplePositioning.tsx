import * as React from 'react';
import { Box, Portal, PositioningProps, usePopper } from '@fluentui/react-northstar';

const PopperExamplePositioning = () => {
  const [popperProps, setPopperProps] = React.useState<PositioningProps>({ align: 'center', position: 'above' });
  const [box, setBox] = React.useState<'boxA' | 'boxB'>('boxA');

  const [referenceRef, popperRef] = usePopper({
    align: popperProps.align,
    position: popperProps.position,
  });

  return (
    <div style={{ border: '2px dotted grey', margin: 100 }}>
      <div style={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '5px' }}>
          <button onClick={() => setBox('boxA')} style={{ color: box === 'boxA' ? 'blue' : undefined }}>
            use Box A
          </button>
          <button onClick={() => setBox('boxB')} style={{ color: box === 'boxB' ? 'blue' : undefined }}>
            use Box B
          </button>
        </div>

        <div style={{ display: 'flex', gap: '5px' }}>
          <button
            onClick={() => setPopperProps({ align: 'start', position: 'above' })}
            style={{ color: popperProps.align === 'start' && popperProps.position === 'above' ? 'blue' : undefined }}
          >
            align: start, position: above
          </button>
          <button
            onClick={() => setPopperProps({ align: 'center', position: 'above' })}
            style={{ color: popperProps.align === 'center' && popperProps.position === 'above' ? 'blue' : undefined }}
          >
            align: center, position: above
          </button>
          <button
            onClick={() => setPopperProps({ align: 'end', position: 'above' })}
            style={{ color: popperProps.align === 'end' && popperProps.position === 'above' ? 'blue' : undefined }}
          >
            align: end, position: above
          </button>
        </div>

        <div style={{ display: 'flex', gap: '5px' }}>
          <button
            onClick={() => setPopperProps({ align: 'center', position: 'before' })}
            style={{ color: popperProps.align === 'center' && popperProps.position === 'before' ? 'blue' : undefined }}
          >
            align: center, position: before
          </button>
          <button
            onClick={() => setPopperProps({ align: 'center', position: 'after' })}
            style={{ color: popperProps.align === 'center' && popperProps.position === 'after' ? 'blue' : undefined }}
          >
            align: center, position: after
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', marginTop: 200 }}>
        <Box
          content="Box A"
          ref={box === 'boxA' ? referenceRef : undefined}
          styles={{
            border: '1px dashed #ccc',
            color: 'blue',
            textAlign: 'center',
            width: '250px',
          }}
        />
        <Box
          content="Box B"
          ref={box === 'boxB' ? referenceRef : undefined}
          styles={{
            border: '1px dashed #ccc',
            color: 'blue',
            justifySelf: 'end',
            textAlign: 'center',
            width: '250px',
          }}
        />
      </div>

      <Portal open>
        <div ref={popperRef} style={{ height: '50px', width: '100px', border: '2px solid orange' }}>
          A popper
        </div>
      </Portal>
    </div>
  );
};

export default PopperExamplePositioning;
