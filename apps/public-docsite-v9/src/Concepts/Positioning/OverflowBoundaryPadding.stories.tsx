import * as React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverSurface,
  Button,
  makeStyles,
  Checkbox,
  SpinButton,
  Label,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  boundary: {
    border: '2px dashed red',
    padding: '20px',
    width: '300px',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
  },
  trigger: {
    display: 'block',
    width: '150px',
    marginTop: '60px',
  },
});

export const OverflowBoundaryPadding = () => {
  const styles = useStyles();
  const [boundaryRef, setBoundaryRef] = React.useState<HTMLDivElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [padding, setPadding] = React.useState(8);

  return (
    <>
      <div>
        <Checkbox
          labelPosition="before"
          label="Open"
          checked={open}
          onChange={(e, data) => setOpen(data.checked as boolean)}
        />
      </div>
      <div>
        <Label style={{ marginRight: 4, marginLeft: 8 }} htmlFor="boundary-padding">
          Padding
        </Label>
        <SpinButton id="boundary-padding" value={padding} onChange={(e, { value }) => value && setPadding(value)} />
      </div>
      <div ref={setBoundaryRef} className={styles.boundary}>
        <Popover
          open={open}
          positioning={{
            overflowBoundary: boundaryRef,
            overflowBoundaryPadding: padding,
            position: 'below',
            align: 'start',
          }}
        >
          <PopoverTrigger disableButtonEnhancement>
            <Button className={styles.trigger}>Shorthand padding</Button>
          </PopoverTrigger>
          <PopoverSurface>10px padding from boundary</PopoverSurface>
        </Popover>

        <Popover
          open={open}
          positioning={{
            overflowBoundary: boundaryRef,
            overflowBoundaryPadding: { end: padding, top: 0, start: 0, bottom: 0 },
            position: 'below',
            align: 'start',
          }}
        >
          <PopoverTrigger disableButtonEnhancement>
            <Button className={styles.trigger}>Longhand padding</Button>
          </PopoverTrigger>
          <PopoverSurface>10px padding from boundary end</PopoverSurface>
        </Popover>
      </div>
    </>
  );
};

OverflowBoundaryPadding.parameters = {
  docs: {
    description: {
      story: [
        'The `overflowBoundaryPadding` property sets the padding between the positioned element and the',
        'chosen boundary. The padding can be a shorthand number which applies for all sides, or an object',
        'That explicitly sets the padding for each side.',
        '',
        '> _Design guidance recommenends using **8px** or **4px** if a padding is required._',
        '_Custom values are also possible but should stay within a 4px grid, please consult your_',
        '_designer if a custom padding is required._',
      ].join('\n'),
    },
  },
};
