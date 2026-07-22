import * as React from 'react';
import type { PositioningImperativeRef, OnPositioningEndEvent } from '@fluentui/react-components';

import {
  useId,
  Text,
  makeStyles,
  tokens,
  Popover,
  Button,
  PopoverTrigger,
  PopoverSurface,
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
  const [statusLog, setStatusLog] = React.useState<Array<{ timestamp: number; message: string }>>([]);
  const positioningRef = React.useRef<PositioningImperativeRef>(null);
  const [open, setOpen] = React.useState(false);

  const onOpenChange = React.useCallback((_: React.SyntheticEvent | Event, data: { open: boolean }) => {
    setOpen(data.open);
    if (!data.open) {
      setStatusLog([]);
    }
  }, []);

  const updatePosition = React.useCallback(() => {
    positioningRef.current?.updatePosition();
  }, []);

  const onPositioningEnd = React.useCallback((e: OnPositioningEndEvent) => {
    const { placement, escaped, referenceHidden } = e.detail;
    const visibility = escaped || referenceHidden ? 'hidden' : 'visible';

    setStatusLog(s => [
      {
        timestamp: Date.now(),
        message: `placement=${placement}, escaped=${escaped}, referenceHidden=${referenceHidden}, visibility=${visibility}`,
      },
      ...s,
    ]);
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
          {statusLog.map((entry, i) => {
            const date = new Date(entry.timestamp);
            return (
              <div key={i}>
                {date.toLocaleTimeString()} <Text weight="bold">{entry.message}</Text>
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
        'The callback now includes `placement`, `escaped`, and `referenceHidden` in `event.detail` so consumers can',
        'respond to visibility conditions without relying on CSS attribute selectors.',
        '',
        '> ⚠️ _Very few use cases would actually require listening to position updates. Please remember that_',
        '_there is a difference between this and the **open/close state** which is normally handled in React_',
      ].join('\n'),
    },
  },
};
