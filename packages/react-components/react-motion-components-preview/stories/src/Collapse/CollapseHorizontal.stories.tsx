import { Field, makeStyles, tokens, Switch } from '@fluentui/react-components';
import { Collapse } from '@fluentui/react-motion-components-preview';
import * as React from 'react';

const useClasses = makeStyles({
  container: {
    // display: 'grid',
    // gridTemplate: `"controls ." "card card" / 1fr 1fr`,
    // gap: '20px 10px',
  },
  card: {
    gridArea: 'card',
    padding: '10px',
    // overflow: 'hidden',
    width: '300px',
    background: tokens.colorNeutralForegroundDisabled,
  },
  controls: {
    display: 'grid',
    gridTemplateColumns: '1fr 3fr',
    // flexDirection: 'row',
    justifyContent: 'start',
    gridArea: 'controls',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  field: {
    flex: 1,
  },
});

const LoremIpsum = () => (
  <>
    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(
      3,
    )}
  </>
);

export const Horizontal = () => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(false);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
      </div>

      <div style={{ display: 'flex' }}>
        <Collapse visible={visible} orientation="horizontal">
          <div>
            <div className={classes.card}>
              <LoremIpsum />
            </div>
          </div>
        </Collapse>
        <div
          style={{
            background: 'lightblue',
            width: '100px',
            height: '100px',
            border: 'solid 2px black',
            borderRadius: '20px',
            padding: '50px',
            textAlign: 'center',
          }}
        >
          Other Content
        </div>
      </div>
    </div>
  );
};
