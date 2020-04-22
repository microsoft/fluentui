import * as React from 'react';
import { Ref } from '@fluentui/react-component-ref';

export type DebugFrameProps = {
  target;
  selector;
  componentName?;
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

const TrashAltRegularIcon = props => (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="far"
    data-icon="trash-alt"
    className="svg-inline--fa fa-trash-alt fa-w-14"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    style={props?.style}
  >
    <path
      fill="currentColor"
      d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"
    />
  </svg>
);

const LevelUpAltIcon = props => (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="level-up-alt"
    className="svg-inline--fa fa-level-up-alt fa-w-10"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512"
    style={props?.style}
  >
    <path
      fill="currentColor"
      d="M313.553 119.669L209.587 7.666c-9.485-10.214-25.676-10.229-35.174 0L70.438 119.669C56.232 134.969 67.062 160 88.025 160H152v272H68.024a11.996 11.996 0 0 0-8.485 3.515l-56 56C-4.021 499.074 1.333 512 12.024 512H208c13.255 0 24-10.745 24-24V160h63.966c20.878 0 31.851-24.969 17.587-40.331z"
    />
  </svg>
);

const DebugFrameButton: React.FunctionComponent<React.HTMLAttributes<HTMLButtonElement>> = props => {
  return (
    <button
      style={{
        border: 'none',
        background: 'none',
        color: 'inherit',
        padding: '0 0 0 .5em',
        outline: 'none',
      }}
      {...props}
    />
  );
};

// FIXME: temporary hacky implementation! reuse DebugRect
export const DebugFrame: React.FunctionComponent<DebugFrameProps> = ({
  target,
  selector,
  componentName,
  onDelete,
  onGoToParent,
}) => {
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
      <pre
        style={{
          position: 'fixed',
          padding: 0,
          margin: 0,

          background: '#ffc65c11',
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
            left: 0,

            whiteSpace: 'nowrap',
            background: '#ffc65c',
            border: '1px solid #ffc65c',
            pointerEvents: 'initial',

            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <span style={{ fontWeight: 'bold' }}>{componentName}</span>
          <DebugFrameButton onClick={handleDelete} title={'Delete component'}>
            <TrashAltRegularIcon style={{ widht: '1em', height: '1em' }} />
          </DebugFrameButton>
          <DebugFrameButton onClick={handleGoToParent} title="Go to parent component">
            <LevelUpAltIcon style={{ widht: '1em', height: '1em' }} />
          </DebugFrameButton>
        </div>
      </pre>
    </Ref>
  );
};
