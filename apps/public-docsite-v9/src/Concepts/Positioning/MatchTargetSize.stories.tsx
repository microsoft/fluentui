import * as React from 'react';
import { Button, Popover, PopoverSurface, PopoverTrigger, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  target: {
    width: '350px',
  },
});

export const MatchTargetSize = () => {
  const styles = useStyles();
  return (
    <Popover open positioning={{ matchTargetSize: 'width' }}>
      <PopoverTrigger disableButtonEnhancement>
        <Button className={styles.target} appearance="primary">
          Click me
        </Button>
      </PopoverTrigger>

      <PopoverSurface style={{ boxSizing: 'border-box' }}>
        This popover has the same width as its target anchor
      </PopoverSurface>
    </Popover>
  );
};

MatchTargetSize.parameters = {
  docs: {
    description: {
      story: [
        'The `matchTargetSize` option will automatically style the positioned element so that the chosen dimension',
        'matches that of the target element. This can be useful for autocomplete or combobox input fields where the',
        'popover should match the width of the text input field.',
        '',
        '> ⚠️ Make sure that the positioned element use `box-sizing: border-box`',
      ].join('\n'),
    },
  },
};
