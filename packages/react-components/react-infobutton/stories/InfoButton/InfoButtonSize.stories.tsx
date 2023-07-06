import * as React from 'react';
import { InfoButton } from '@fluentui/react-infobutton';
import { Label, Link, makeStyles, shorthands, useId } from '@fluentui/react-components';
import type { InfoButtonProps } from '@fluentui/react-infobutton';
import type { PopoverProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  base: {
    alignItems: 'start',
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('80px'),
    ...shorthands.padding('20px'),
  },
  infoButton: {
    verticalAlign: 'top',
  },
});

const InfoButtonSize: React.FC<{ size: InfoButtonProps['size'] }> = ({ size }) => {
  const styles = useStyles();
  const labelId = useId('label');
  const infobuttonId = useId('infobutton');
  const infobuttonInfoId = infobuttonId + '__info';

  const [open, setOpen] = React.useState(false);

  const info = (
    <>
      This is example information for an InfoButton. <Link href="https://react.fluentui.dev">Learn more</Link>
    </>
  );

  const onOpenChange: PopoverProps['onOpenChange'] = (e, data) => setOpen(data.open);

  return (
    <div aria-owns={open ? infobuttonInfoId : undefined}>
      <Label size={size} id={labelId}>
        This is a {size} Infobutton
      </Label>
      <InfoButton
        size={size}
        id={infobuttonId}
        className={styles.infoButton}
        info={{
          id: infobuttonInfoId,
          children: info,
        }}
        popover={{
          onOpenChange,
        }}
      />
    </div>
  );
};

export const Size = () => {
  const styles = useStyles();

  return (
    <div className={styles.base}>
      <InfoButtonSize size="small" />
      <InfoButtonSize size="medium" />
      <InfoButtonSize size="large" />
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: 'An InfoButton supports a range of sizes from small to large. The default is medium.',
    },
  },
};
