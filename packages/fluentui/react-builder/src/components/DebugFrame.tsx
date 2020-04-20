import * as React from 'react';
import { Ref } from '@fluentui/react-component-ref';

export type DebugFrameProps = {
  target;
  selector;
  onDelete?;
  onGoToParent?;
};

const setFramePosition = (frameEl, controlEl) => {
  const rect = controlEl.getBoundingClientRect();
  frameEl.style.top = `${rect.top}px`;
  frameEl.style.left = `${rect.left}px`;
  frameEl.style.width = `${rect.width}px`;
  frameEl.style.height = `${rect.height}px`;
  frameEl.style.display = 'block';

  requestAnimationFrame(() => setFramePosition(frameEl, controlEl));
};

const hideFrame = frameEl => {
  frameEl.style.display = 'none';
};

// FIXME: temporary hacky implementation! reuse DebugRect
export const DebugFrame: React.FunctionComponent<DebugFrameProps> = ({ target, selector, onDelete, onGoToParent }) => {
  const frameRef = React.createRef<HTMLDivElement>();

  const handleDelete = React.useCallback(() => {
    onDelete?.();
  }, [onDelete]);

  const handleGoToParent = React.useCallback(() => {
    console.log('goto parent');
    onGoToParent?.();
  }, [onGoToParent]);

  React.useEffect(() => {
    console.log('DebugFrame');
    if (!frameRef.current) {
      return undefined;
    }

    const el = target.querySelectorAll(selector);
    console.log('DebugFrame', { target, selector, el });

    if (el.length !== 1) {
      hideFrame(frameRef.current);
      return undefined;
    }

    setFramePosition(frameRef.current, el[0]);
  }, [target, selector]);

  return (
    <Ref innerRef={frameRef}>
      <div
        style={{
          position: 'fixed',
          padding: 0,
          margin: 0,

          background: '#ffc65c11',
          border: '1px solid #ffc65ccc',

          zIndex: 99999998,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            padding: '0 1em',
            left: '-1px',
            whiteSpace: 'nowrap',
            background: '#ffc65c99',
            border: '1px solid #ffc65c',
            pointerEvents: 'initial',
          }}
        >
          <button onClick={handleDelete}>delete</button>
          <button onClick={handleGoToParent}>parent</button>
        </div>
      </div>
    </Ref>
  );
};
