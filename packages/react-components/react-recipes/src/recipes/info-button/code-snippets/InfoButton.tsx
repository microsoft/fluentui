import * as React from 'react';
import { Button, makeStyles, Popover, PopoverSurface, PopoverTrigger, tokens } from '@fluentui/react-components';

import {
  bundleIcon,
  Info16Filled,
  Info16Regular,
  iconFilledClassName,
  iconRegularClassName,
} from '@fluentui/react-icons';

const DefaultInfoButtonIcon16 = bundleIcon(Info16Filled, Info16Regular);

const useStyles = makeStyles({
  buttonOpen: {
    color: tokens.colorNeutralForeground2BrandHover,
    [`& .${iconFilledClassName}`]: {
      display: 'inline-flex',
    },
    [`& .${iconRegularClassName}`]: {
      display: 'none',
    },
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export const InfoButtonSnippetExample = () => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <div className={styles.center}>
      <Popover
        open={open}
        onOpenChange={(e, data) => setOpen(data.open)}
        withArrow
        size="medium"
        positioning="above-start"
      >
        <PopoverTrigger>
          <Button
            className={open ? styles.buttonOpen : ''}
            appearance="transparent"
            icon={<DefaultInfoButtonIcon16 />}
          />
        </PopoverTrigger>
        <PopoverSurface role="note">This is an example InfoButton.</PopoverSurface>
      </Popover>
    </div>
  );
};
