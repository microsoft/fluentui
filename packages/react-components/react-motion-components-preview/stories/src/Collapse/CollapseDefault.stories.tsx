import { Field, makeStyles, tokens, Switch, Radio, RadioGroup } from '@fluentui/react-components';
import { Collapse } from '@fluentui/react-motion-components-preview';
import { CollapseOrientation } from '../../../library/src/components/Collapse/Collapse';
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
      10,
    )}
  </>
);

export const Default = () => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(false);
  const [orientation, setOrientation] = React.useState<CollapseOrientation>('vertical');
  // const [orientation, setOrientation] = React.useState<Orientation>('horizontal');

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>

        <Field className={classes.field}>
          <RadioGroup
            layout="horizontal"
            value={orientation}
            onChange={(_, data) => setOrientation(data.value as CollapseOrientation)}
          >
            <Radio value="vertical" label="vertical" />
            <Radio value="horizontal" label="horizontal" />
          </RadioGroup>
        </Field>
      </div>

      <div style={{ display: 'flex' }}>
        <Collapse visible={visible} orientation={orientation}>
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
