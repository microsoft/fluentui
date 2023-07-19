import * as React from 'react';
import { InfoButton } from '@fluentui/react-infobutton';
import { Label, makeStyles, useId } from '@fluentui/react-components';
import type { InfoButtonProps } from '@fluentui/react-infobutton';
import type { PopoverProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  infoButton: {
    verticalAlign: 'top',
  },
});

export const Default = (props: Partial<InfoButtonProps>) => {
  const styles = useStyles();
  const labelId = useId('label');
  const infobuttonId = useId('infobutton');
  const infobuttonInfoId = infobuttonId + '__info';
  const [open, setOpen] = React.useState(false);

  const onOpenChange: PopoverProps['onOpenChange'] = (e, data) => {
    setOpen(data.open);
  };

  return (
    <div aria-owns={open ? infobuttonInfoId : undefined}>
      <Label id={labelId}>This is a default Infobutton</Label>
      <InfoButton
        {...props}
        id={infobuttonId}
        className={styles.infoButton}
        info={{
          id: infobuttonInfoId,
          children: 'This is example information for an InfoButton.',
        }}
        popover={{
          onOpenChange,
        }}
      />
    </div>
  );
};
