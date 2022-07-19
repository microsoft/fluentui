import * as React from 'react';
import { makeStyles } from '@griffel/react';
import {
  Button,
  FluentProvider,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  webLightTheme,
} from '@fluentui/react-components';
import { ExportLink } from './ExportLink';

const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '20px',
  },
});

export const ExportButton = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Popover trapFocus={true}>
        <PopoverTrigger>
          <Button size="small" appearance="outline">
            Save
          </Button>
        </PopoverTrigger>
        <FluentProvider theme={webLightTheme}>
          <PopoverSurface>
            <ExportLink />
          </PopoverSurface>
        </FluentProvider>
      </Popover>
    </div>
  );
};
