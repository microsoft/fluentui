import * as React from 'react';
import {
  useId,
  Text,
  makeStyles,
  tokens,
  Popover,
  Button,
  PopoverTrigger,
  PopoverSurface,
  PositioningImperativeRef,
  PopoverProps,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    gap: '20px',
  },

  button: {
    display: 'block',
    minWidth: '120px',
  },

  logContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  logLabel: {
    color: tokens.colorNeutralForegroundOnBrand,
    backgroundColor: tokens.colorBrandBackground,
    width: 'fit-content',
    fontWeight: tokens.fontWeightBold,
    padding: '2px 12px',
  },

  log: {
    overflowY: 'auto',
    boxShadow: tokens.shadow16,
    position: 'relative',
    minWidth: '200px',
    height: '200px',
    border: `2px solid ${tokens.colorBrandBackground}`,
    padding: '12px',
  },
});

export const ListenToUpdates = () => {
  const styles = useStyles();
  const labelId = useId();
  const [statusLog, setStatusLog] = React.useState<number[]>([]);
  const positioningRef = React.useRef<PositioningImperativeRef>(null);
  const [open, setOpen] = React.useState(false);

  const onOpenChange: PopoverProps['onOpenChange'] = React.useCallback((e, data) => {
    setOpen(data.open);
    if (!data.open) {
      setStatusLog([]);
    }
  }, []);

  const updatePosition = React.useCallback(() => {
    positioningRef.current?.updatePosition();
  }, []);

  const onPositioningEnd = React.useCallback(() => {
    setStatusLog(s => [Date.now(), ...s]);
  }, []);

  return (
    <div className={styles.root}>
      <div>
        <Popover
          open={open}
          onOpenChange={onOpenChange}
          positioning={{ positioningRef, onPositioningEnd, position: 'below' }}
        >
          <PopoverTrigger>
            <Button className={styles.button}>Open popover</Button>
          </PopoverTrigger>
          <PopoverSurface>
            <Button className={styles.button} onClick={updatePosition}>
              Update position
            </Button>
          </PopoverSurface>
        </Popover>
      </div>
      <div className={styles.logContainer}>
        <div className={styles.logLabel} id={labelId}>
          Status log
        </div>
        <div role="log" aria-labelledby={labelId} className={styles.log}>
          {statusLog.map((time, i) => {
            const date = new Date(time);
            return (
              <div key={i}>
                {date.toLocaleTimeString()} <Text weight="bold">Position updated [{i}]</Text>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

ListenToUpdates.parameters = {
  docs: {
    description: {
      story: [
        'Positioning happens outside of the React render lifecycle for performance purposes so that a position update',
        'does not need to:',
        '- trigger by a re-render',
        '- be dependent on a re-render',
        '',
        'This constraint makes it difficult to know exactly when an element has been positioned. In order to listen',
        'to position updates you can use the `onPositioningEnd` callback.',
        '',
        '> ⚠️ _Very few use cases would actually require listening to position updates. Please remember that_',
        '_there is a difference between this and the **open/close state** which is normally handled in React_',
      ].join('\n'),
    },
  },
};
