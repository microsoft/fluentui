import * as React from 'react';
import {
  Tooltip,
  Text,
  tokens,
  mergeClasses,
  useIsomorphicLayoutEffect,
  useFluent,
  makeStyles,
  Switch,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    gap: '30px',
  },
  overflowTextWrapper: {
    border: `2px dashed ${tokens.colorNeutralStroke1}`,
  },
  reducedWrapper: {
    maxWidth: '300px',
    border: `2px dashed ${tokens.colorStatusDangerBorder2}`,
  },
  overflowContainer: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  resizableArea: {
    minWidth: '200px',
    maxWidth: '800px',
    border: `2px solid ${tokens.colorBrandBackground}`,
    padding: '20px 10px 10px 10px',
    position: 'relative',
    resize: 'horizontal',
    '::after': {
      content: `'Resizable Area'`,
      position: 'absolute',
      padding: '1px 4px 1px',
      top: '-2px',
      left: '-2px',
      fontFamily: 'monospace',
      fontSize: '15px',
      fontWeight: 900,
      lineHeight: 1,
      letterSpacing: '1px',
      color: tokens.colorNeutralForegroundOnBrand,
      backgroundColor: tokens.colorBrandBackground,
    },
  },
});

type Overflow = {
  x: boolean;
  y: boolean;
};

const useIsOverflow = (ref: React.RefObject<HTMLElement>) => {
  const { targetDocument } = useFluent();
  const [overflow, setOverflow] = React.useState<Overflow>({ x: false, y: false });

  const observer = React.useRef<ResizeObserver | null>(null);

  useIsomorphicLayoutEffect(() => {
    const { current } = ref;

    if (!current || !targetDocument) {
      return;
    }

    const trigger = () => {
      const overflowX = current.scrollWidth > current.clientWidth;
      const overflowY = current.scrollHeight > current.clientHeight;

      const newOverflow = { x: overflowX, y: overflowY };

      setOverflow(prev => {
        if (prev.x !== newOverflow.x || prev.y !== newOverflow.y) {
          return newOverflow;
        }
        return prev;
      });
    };

    if (targetDocument.defaultView && 'ResizeObserver' in targetDocument.defaultView) {
      observer.current = new ResizeObserver(trigger);
      observer.current.observe(current);
    }

    trigger();

    return () => {
      observer.current?.disconnect();
    };
  }, [ref, targetDocument]);

  return overflow;
};

export const WithOverflow = () => {
  const styles = useStyles();
  const parentRef = React.useRef<HTMLDivElement>(null);
  const textRef = React.useRef<HTMLDivElement>(null);

  const [isForced, setIsForced] = React.useState(false);
  const [isVisibleFirst, setIsVisibleFirst] = React.useState(false);
  const [isVisibleSecond, setIsVisibleSecond] = React.useState(false);

  const { x: overflowXParent } = useIsOverflow(parentRef);
  const { x: overflowXText } = useIsOverflow(textRef);

  const handleForceOverflow = React.useCallback(ev => {
    setIsForced(ev.currentTarget.checked);
  }, []);

  return (
    <div className={mergeClasses(styles.wrapper)}>
      <Switch label="Force text to overflow" onChange={handleForceOverflow} />
      <div ref={parentRef} className={mergeClasses(styles.overflowContainer, styles.resizableArea)}>
        <Tooltip
          relationship="label"
          withArrow
          positioning={{
            target: parentRef.current,
          }}
          visible={isVisibleFirst && overflowXParent}
          onVisibleChange={(_, data) => {
            setIsVisibleFirst(data.visible);
          }}
          content="Tooltip content"
        >
          <Text wrap={false} truncate>
            If the parent element's content overflows, hovering here will show a tooltip (anchored to the parent
            element).
          </Text>
        </Tooltip>
      </div>
      <div className={mergeClasses(styles.overflowTextWrapper, isForced && styles.reducedWrapper)}>
        <Tooltip
          relationship="label"
          withArrow
          visible={overflowXText && isVisibleSecond}
          onVisibleChange={(_, data) => {
            setIsVisibleSecond(data.visible);
          }}
          content="Tooltip content"
        >
          <Text wrap={false} truncate block ref={textRef}>
            If the Tooltip's content overflows, hovering here will show a tooltip.
          </Text>
        </Tooltip>
      </div>
    </div>
  );
};

WithOverflow.parameters = {
  docs: {
    description: {
      story: 'Tooltip can be controlled and shown only based on overflow condition',
    },
  },
};
