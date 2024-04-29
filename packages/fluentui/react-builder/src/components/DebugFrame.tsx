import * as React from 'react';
import { CloneDebugButton, LevelUpDebugButton, TrashDebugButton } from './DebugButtons';

export type DebugFrameProps = {
  target;
  selector;
  componentName?;
  componentAccessibilityErrors?;
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
  componentAccessibilityErrors,
  onClone,
  onDelete,
  onMove,
  onGoToParent,
}) => {
  const frameRef = React.useRef<HTMLPreElement>();
  const animationFrameId = React.useRef<number>();
  const [isTopElement, setIsTopElement] = React.useState(false);

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
    const isTopElementThreshold = 20;
    if (el.length === 1) {
      const rect = el[0].getBoundingClientRect();
      rect.top < isTopElementThreshold
        ? !isTopElement && setIsTopElement(true)
        : isTopElement && setIsTopElement(false);
      animationFrameId.current = requestAnimationFrame(() => setFramePosition(frameRef.current, el[0]));
    } else {
      animationFrameId.current = requestAnimationFrame(() => hideFrame(frameRef.current));
    }

    return () => cancelAnimationFrame(animationFrameId.current);
  }, [target, selector, animationFrameId, setFramePosition, isTopElement]);

  const hasAccessibilityErrors = componentAccessibilityErrors.length !== 0;
  const styles: React.CSSProperties = {
    position: 'absolute',
    padding: '2px 4px',
    margin: '-1px 0 0 -1px',
    left: 0,
    whiteSpace: 'nowrap',
    pointerEvents: 'initial',

    background: hasAccessibilityErrors ? '#FA1B00' : `#ffc65c`,
    border: hasAccessibilityErrors ? '#1px solid #FA1B00' : `1px solid #ffc65c`,
    display: 'flex',
    alignItems: 'flex-end',
    zIndex: 99999998,
  };

  const iconStyles: React.CSSProperties = {
    position: 'fixed',
    padding: 0,
    margin: 0,

    background: hasAccessibilityErrors ? '#FA1B0011' : `#ffc65c11`,
    border: hasAccessibilityErrors ? '#1px solid #FA1B00ccc' : `1px solid #ffc65ccc`,
    color: hasAccessibilityErrors ? '#FFFFF0' : '#ffff',
    zIndex: 99999998,
    userSelect: 'none',
  };

  isTopElement ? (styles['top'] = '100%') : (styles['bottom'] = '100%');

  return (
    <pre ref={frameRef} style={iconStyles}>
      <div style={{ width: '100%', height: '100%' }} draggable={true} onDragStart={handleMove} />
      <div style={styles}>
        <span style={{ fontWeight: 'bold' }}>{componentName}</span>

        <LevelUpDebugButton onClick={handleGoToParent} />
        <CloneDebugButton onClick={handleClone} />
        <TrashDebugButton onClick={handleDelete} />
      </div>
    </pre>
  );
};
