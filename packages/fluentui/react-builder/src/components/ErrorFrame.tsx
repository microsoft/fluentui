import * as React from 'react';

export type ErrorFrameProps = {
  target;
  selector;
  errors;
};

export const ErrorIcon = props => (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="exclamation-circle"
    className="svg-inline--fa fa-exclamation-circle fa-w-16"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    style={props?.style}
  >
    <path
      fill="currentColor"
      d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
    />
  </svg>
);

// FIXME: temporary hacky implementation! reuse DebugRect
export const ErrorFrame: React.FunctionComponent<ErrorFrameProps> = ({ target, selector, errors }) => {
  const frameRef = React.useRef<HTMLPreElement>();
  const animationFrameId = React.useRef<number>();

  const setFramePosition = React.useCallback((frameEl, controlEl) => {
    const rect = controlEl.getBoundingClientRect();
    frameEl.style.top = `${rect.top}px`;
    frameEl.style.left = `${rect.left}px`;
    frameEl.style.width = `${rect.width}px`;
    frameEl.style.height = `${rect.height}px`;
    frameEl.style.display = 'block';

    animationFrameId.current = requestAnimationFrame(() => setFramePosition(frameEl, controlEl));
  }, []);

  const hideFrame = frameEl => {
    frameEl.style.display = 'none';
  };

  React.useEffect(() => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }

    if (!frameRef.current) {
      return undefined;
    }

    const el = target.querySelectorAll(selector);

    animationFrameId.current =
      el.length === 1
        ? requestAnimationFrame(() => setFramePosition(frameRef.current, el[0]))
        : requestAnimationFrame(() => hideFrame(frameRef.current));

    return () => cancelAnimationFrame(animationFrameId.current);
  }, [target, selector, setFramePosition]);

  return (
    <pre
      ref={frameRef}
      style={{
        position: 'fixed',
        padding: 0,
        margin: 0,

        background: '#e3404022',
        border: '1px solid #ffc65ccc',
        color: '#444',
        zIndex: 99999998,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: '100%',
          padding: '2px 4px',
          margin: '-1px 0 0 -1px',
          right: 0,

          whiteSpace: 'nowrap',
          color: 'white',
          background: '#e34040',
          border: '1px solid #ffc65c',
          pointerEvents: 'initial',

          display: 'flex',
          alignItems: 'center',
          zIndex: 99999998,
        }}
      >
        <ErrorIcon style={{ width: '1em', height: '1em' }} />
        <span style={{ marginLeft: '.2em', fontWeight: 'bold' }}>{errors}</span>
      </div>
    </pre>
  );
};
