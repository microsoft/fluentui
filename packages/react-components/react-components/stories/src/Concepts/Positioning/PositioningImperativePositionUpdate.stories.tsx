import * as React from 'react';
import { Button, Popover, PopoverSurface, PopoverTrigger, Slider, Field, makeStyles } from '@fluentui/react-components';
import type { PositioningImperativeRef, SliderProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    position: 'relative',
  },

  button: {
    position: 'absolute',
  },

  slider: {
    marginBottom: '10px',
  },
});

export const ImperativePositionUpdate = () => {
  const styles = useStyles();
  const positioningRef = React.useRef<PositioningImperativeRef>(null);
  const [value, setValue] = React.useState(0);

  const onChange: SliderProps['onChange'] = React.useCallback((e, data) => {
    setValue(data.value);
  }, []);

  React.useEffect(() => {
    positioningRef.current?.updatePosition();
  }, [value]);

  return (
    <div className={styles.container}>
      <Field label="Move the button with the slider">
        <Slider className={styles.slider} value={value} onChange={onChange} max={80} />
      </Field>
      <Popover positioning={{ position: 'below', positioningRef }} open>
        <PopoverTrigger disableButtonEnhancement>
          <Button style={{ left: `${value}%` }} className={styles.button} appearance="primary">
            Popover
          </Button>
        </PopoverTrigger>

        <PopoverSurface style={{ minWidth: 100 }}>Target</PopoverSurface>
      </Popover>
    </div>
  );
};

ImperativePositionUpdate.parameters = {
  layout: 'padded',
  docs: {
    description: {
      story: [
        'The `positioningRef` positioning prop provides an [imperative handle](https://reactjs.org/docs/hooks-reference.html#useimperativehandle)',
        'to reposition the positioned element.',
        'In this example the `updatePosition` command is used to reposition the popover when its target button is',
        'dynamically moved.',
        '',
        '> ⚠️ In later versions of Fluent UI, position updates are triggered once the target or container dimensions',
        'change. This was previously the main use case for imperative position updates. Please think carefully',
        'if your scenario needs this pattern in the future.',
      ].join('\n'),
    },
  },
};
