import { Field, makeStyles, tokens, Switch } from '@fluentui/react-components';
import { CollapseExaggerated } from '@fluentui/react-motion-components-preview';
import * as React from 'react';

import description from './CollapseDisableMotion.md';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"controls ." "card card" / 1fr 1fr`,
    gap: '20px 10px',
  },
  card: {
    gridArea: 'card',
    padding: '10px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  field: {
    display: 'flex',
    flex: 1,
    gao: '20px',
  },
});

const LoremIpsum = () => (
  <>
    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(
      10,
    )}
  </>
);

export const DisableMotion = () => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(false);
  const [disableMotion, setDisableMotion] = React.useState<boolean>(false);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
          <Switch label="Disable collapse animaiton" checked={disableMotion} onChange={() => setDisableMotion(v => !v)} />
        </Field>
      </div>

      <CollapseExaggerated visible={visible} skip={disableMotion}>
        <div className={classes.card}>
          <LoremIpsum />
        </div>
      </CollapseExaggerated>
    </div>
  );
};

DisableMotion.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
