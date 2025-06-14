import * as React from 'react';
import {
  Field,
  Select,
  makeStyles,
  tokens,
  Switch,
  motionTokens,
  createPresenceComponentVariant,
  useId,
} from '@fluentui/react-components';
import { Stagger, Fade, Scale } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    // flexWrap: 'wrap',
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
    flex: 1,
  },
  items: {
    display: 'flex',
    flexDirection: 'column',
    // flexWrap: 'wrap',
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: tokens.colorBrandBackground,
    color: 'white',
    // border: `${tokens.strokeWidthThicker} solid ${tokens.colorTransparentStroke}`,
    width: '400px',
    height: '20px',
    margin: '2px',
  },
});

const FadeUltraSlow = createPresenceComponentVariant(Fade, {
  duration: motionTokens.durationUltraSlow,
});

const ScaleFull = createPresenceComponentVariant(Scale, {
  duration: motionTokens.durationSlow,
  fromScale: 0,
});

export const Default = (props: {} /* TODO: Stagger props */) => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(false);
  const [reversed, setReversed] = React.useState<boolean>(false);
  const [transition, setTransition] = React.useState<'Fade' | 'Scale'>('Fade');

  const transitionSelectId = useId();

  // TODO: clean up this mapping
  const ItemTransition = transition === 'Fade' ? FadeUltraSlow : ScaleFull;

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>

        <Field className={classes.field}>
          <Switch label="Reversed" checked={reversed} onChange={() => setReversed(v => !v)} />
        </Field>

        <label htmlFor={transitionSelectId}>transition</label>
        <Select
          id={transitionSelectId}
          onChange={(_, data) => setTransition(data.value as typeof transition)}
          defaultValue={transition}
        >
          <option>Fade</option>
          <option>Scale</option>
        </Select>
      </div>

      <div>
        <div className={classes.items}>
          <Stagger presence visible={visible} reversed={reversed}>
            {/* Create a list of items, each wrapped with a presence transition */}
            {Array.from({ length: 10 }, (_, i) => (
              <ItemTransition key={i}>
                <div className={classes.item}>{i}</div>
              </ItemTransition>
            ))}
          </Stagger>
        </div>
      </div>
    </div>
  );
};
