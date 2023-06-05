import * as React from 'react';
import { InfoTip } from '@fluentui/react-infobutton';
import { Label, makeStyles, useId } from '@fluentui/react-components';
import type { InfoTipProps } from '@fluentui/react-infobutton';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    rowGap: '20px',
    flexDirection: 'column',
  },
  infoTip: {
    verticalAlign: 'top',
  },
});

const InfoTipSize: React.FC<{ size: InfoTipProps['size'] }> = ({ size }) => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);

  const infoTipId = useId('infoTip');
  const infoTipInfoId = infoTipId + '__info';

  return (
    <div aria-owns={open ? infoTipId : undefined}>
      <Label size={size} id={infoTipInfoId}>
        This is a {size} label with an InfoTip
      </Label>
      <InfoTip
        aria-labelledby={`${infoTipId} ${infoTipInfoId}`}
        info={{
          children: 'InfoTip sample text',
          id: infoTipId,
        }}
        className={styles.infoTip}
        tooltip={{
          onVisibleChange(event, data) {
            setOpen(data.visible);
          },
        }}
      />
    </div>
  );
};

export const Size = () => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <InfoTipSize size="small" />
      <InfoTipSize size="medium" />
      <InfoTipSize size="large" />
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: 'An InfoTip supports a range of sizes from small to large. The default is medium.',
    },
  },
};
