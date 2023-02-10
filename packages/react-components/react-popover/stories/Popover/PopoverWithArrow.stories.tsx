import * as React from 'react';

import {
  Body1,
  Button,
  makeStyles,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  Subtitle2,
  useFluent,
} from '@fluentui/react-components';

const supportsBackdropFilter = '@supports (backdrop-filter: blur(100px))';

const useStyles = makeStyles({
  contentHeader: {
    marginTop: '0',
  },
  surface: {
    display: 'grid',
    [supportsBackdropFilter]: {
      backdropFilter: 'blur(100px)',
    },
  },
  backdropFilterStatus: {
    '::before': { content: '"backdrop-filter: ❌ NOT SUPPORTED"' },
    [supportsBackdropFilter]: {
      '::before': { content: '"backdrop-filter: ✅ Supported"' },
    },
  },
});

const ExampleContent = () => {
  const styles = useStyles();
  const { targetDocument } = useFluent();

  return (
    <PopoverSurface className={styles.surface}>
      <Subtitle2 as="h3" className={styles.contentHeader}>
        Popover container
      </Subtitle2>

      <Body1>
        Device Pixel Ratio: {Math.round((targetDocument?.defaultView?.devicePixelRatio || 0) * 1000) / 1000}
      </Body1>

      <Body1 className={styles.backdropFilterStatus} />
    </PopoverSurface>
  );
};

export const WithArrow = () => (
  <div style={{ padding: '51px' }}>
    <Popover open withArrow>
      <PopoverTrigger disableButtonEnhancement>
        <Button>Popover trigger</Button>
      </PopoverTrigger>

      <ExampleContent />
    </Popover>
  </div>
);

WithArrow.parameters = {
  docs: {
    description: {
      story: 'WITHOUT device pixel rounding fix',
    },
  },
};
