import * as React from 'react';
import {
  Field,
  makeStyles,
  tokens,
  Switch,
  motionTokens,
  createPresenceComponentVariant,
} from '@fluentui/react-components';
import { PresenceStagger, Scale } from '@fluentui/react-motion-components-preview';

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
    flexWrap: 'wrap',
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: tokens.colorBrandBackground,
    color: 'white',
    // border: `${tokens.strokeWidthThicker} solid ${tokens.colorTransparentStroke}`,
    width: '100px',
    height: '100px',
    margin: '2px',
  },
});

const ScaleFull = createPresenceComponentVariant(Scale, {
  duration: motionTokens.durationSlow,
  fromScale: 0,
});

export const Default = (props: {} /* TODO: PresenceStagger props */) => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(!false);
  // const ItemTransition = Fade;
  const ItemTransition = ScaleFull;

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
      </div>

      <div className={classes.items}>
        <PresenceStagger visible={visible} delay={100}>
          <ItemTransition>
            <div className={classes.item}>Item 1</div>
          </ItemTransition>
          <ItemTransition>
            <div className={classes.item}>Item 2</div>
          </ItemTransition>
          <ItemTransition>
            <div className={classes.item}>Item 3</div>
          </ItemTransition>
          <ItemTransition>
            <div className={classes.item}>Item 4</div>
          </ItemTransition>
          <ItemTransition>
            <div className={classes.item}>Item 5</div>
          </ItemTransition>
          <ItemTransition>
            <div className={classes.item}>Item 6</div>
          </ItemTransition>
          <ItemTransition>
            <div className={classes.item}>Item 7</div>
          </ItemTransition>
          <ItemTransition>
            <div className={classes.item}>Item 8</div>
          </ItemTransition>
          <ItemTransition>
            <div className={classes.item}>Item 9</div>
          </ItemTransition>
          <ItemTransition>
            <div className={classes.item}>Item 10</div>
          </ItemTransition>
        </PresenceStagger>
      </div>
    </div>
  );
};

/*
const createStaggerForMotion = ({
  numItems,
  itemSize = '25px',
  Component = Slide.In,
  props = {},
}: {
  numItems: number;
  itemSize?: string;
  Component?: Function;
  props?: Record<string, any>;
}) => {
  return Array.from({ length: numItems }, (_, i) => {
    const t = i / numItems;
    const backgroundColor = `hsl(${Math.floor(180 + t * 120)}, 100%, 40%)`;
    return (
      // <Blur.In>
      // <span>
      <Component key={i} animateOpacity={animateOpacity} duration={duration} enterDuration={duration} {...props}>
        <div style={{ backgroundColor, width: itemSize, height: itemSize, borderRadius: '0%' }} />
      </Component>
      // </span>
      // </Blur.In>
    );
  });
};
*/
