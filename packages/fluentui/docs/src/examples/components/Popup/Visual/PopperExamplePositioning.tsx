import * as React from 'react';
import {
  ICSSInJSStyle,
  createReferenceFromClick,
  Box,
  Portal,
  PositioningProps,
  usePopper,
} from '@fluentui/react-northstar';

const boxStyles: ICSSInJSStyle = {
  border: '1px dashed #ccc',
  color: 'blue',
  textAlign: 'center',
  width: '250px',
};
const buttonStyles = (active: boolean): React.CSSProperties => ({
  ...(active && {
    borderColor: 'blue',
    borderStyle: 'dotted',
    color: 'blue',
  }),
});
const popperStyles: React.CSSProperties = {
  background: 'lightgray',
  border: '2px dotted red',
  height: '50px',
  textAlign: 'center',
  width: '100px',
};

const PopperExamplePositioning = () => {
  const [box, setBox] = React.useState<'boxA' | 'boxB' | 'context'>('boxA');
  const [open, setOpen] = React.useState<boolean>(false);

  const [popperProps, setPopperProps] = React.useState<PositioningProps>({
    align: 'center',
    position: 'above',
  });
  const virtualEl = React.useRef(null);

  const { targetRef, containerRef } = usePopper({
    align: popperProps.align,
    enabled: open,
    position: popperProps.position,
  });

  React.useLayoutEffect(() => {
    if (box === 'context') {
      targetRef.current = virtualEl.current;
    }
  }, [box, targetRef]);

  return (
    <div style={{ border: '2px dotted grey', margin: 120 }}>
      <div style={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '5px' }}>
          <button id="open-popper" onClick={() => setOpen(true)} style={buttonStyles(open)}>
            open a popper
          </button>
        </div>
        <div style={{ display: 'flex', gap: '5px' }}>
          <button id="use-boxA" onClick={() => setBox('boxA')} style={buttonStyles(box === 'boxA')}>
            use Box A
          </button>
          <button id="use-boxB" onClick={() => setBox('boxB')} style={buttonStyles(box === 'boxB')}>
            use Box B
          </button>
          <button
            onClick={e => {
              virtualEl.current = createReferenceFromClick(e.nativeEvent);
              setBox('context');
            }}
            style={buttonStyles(box === 'context')}
          >
            use context
          </button>
        </div>

        <div style={{ display: 'flex', gap: '5px' }}>
          <button
            onClick={() => setPopperProps({ align: 'start', position: 'above' })}
            style={buttonStyles(popperProps.align === 'start' && popperProps.position === 'above')}
          >
            align: start, position: above
          </button>
          <button
            onClick={() => setPopperProps({ align: 'center', position: 'above' })}
            style={buttonStyles(popperProps.align === 'center' && popperProps.position === 'above')}
          >
            align: center, position: above
          </button>
          <button
            id="align-end-position-above"
            onClick={() => setPopperProps({ align: 'end', position: 'above' })}
            style={buttonStyles(popperProps.align === 'end' && popperProps.position === 'above')}
          >
            align: end, position: above
          </button>
        </div>

        <div style={{ display: 'flex', gap: '5px' }}>
          <button
            onClick={() => setPopperProps({ align: 'center', position: 'before' })}
            style={buttonStyles(popperProps.align === 'center' && popperProps.position === 'before')}
          >
            align: center, position: before
          </button>
          <button
            onClick={() => setPopperProps({ align: 'center', position: 'after' })}
            style={buttonStyles(popperProps.align === 'center' && popperProps.position === 'after')}
          >
            align: center, position: after
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', marginTop: 200 }}>
        <Box content="Box A" ref={box === 'boxA' ? targetRef : undefined} styles={boxStyles} />
        <Box
          content="Box B"
          ref={box === 'boxB' ? targetRef : undefined}
          styles={{ ...boxStyles, justifySelf: 'end' }}
        />
      </div>

      <Portal open={open}>
        <div ref={containerRef} style={popperStyles}>
          A popper
        </div>
      </Portal>
    </div>
  );
};

export default PopperExamplePositioning;
