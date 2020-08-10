import * as React from 'react';
import { CloneDebugButton, LevelUpDebugButton, TrashDebugButton, MoveDebugButton } from './DebugButtons';

export type DebugFrameProps = {
  target;
  selector;
  componentName?;
  onClone?;
  onDelete?;
  onMove?;
  onGoToParent?;
};

// FIXME: temporary hacky implementation! reuse DebugRect
export const DebugFrame: React.FunctionComponent<DebugFrameProps> = ({
  target,
  selector,
  componentName,
  onClone,
  onDelete,
  onMove,
  onGoToParent,
}) => {
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

  const handleMove = React.useCallback(
    e => {
      onMove?.(e);
    },
    [onMove],
  );

  const handleClone = React.useCallback(
    e => {
      onClone?.(e);
    },
    [onClone],
  );

  const handleDelete = React.useCallback(() => {
    onDelete?.();
  }, [onDelete]);

  const handleGoToParent = React.useCallback(() => {
    onGoToParent?.();
  }, [onGoToParent]);

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

        background: '#ffc65c11',
        border: '1px solid #ffc65ccc',
        color: '#444',
        zIndex: 99999998,
        userSelect: 'none',
      }}
    >
      <div style={{ width: '100%', height: '100%' }} onMouseDown={handleMove} />
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
          zIndex: 99999998,
        }}
      >
        <span style={{ fontWeight: 'bold' }}>{componentName}</span>
        <LevelUpDebugButton onClick={handleGoToParent} />
        <MoveDebugButton onClick={handleMove} />
        <CloneDebugButton onClick={handleClone} />
        <TrashDebugButton onClick={handleDelete} />
      </div>
    </pre>
  );
};
