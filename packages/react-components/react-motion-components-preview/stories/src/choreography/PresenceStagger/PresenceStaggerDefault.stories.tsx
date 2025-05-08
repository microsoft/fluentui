import * as React from 'react';
import { Field, makeStyles, tokens, Switch } from '@fluentui/react-components';
import { PresenceStagger, CollapseRelaxed as Fade } from '@fluentui/react-motion-components-preview';

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
    backgroundColor: tokens.colorBrandBackground,
    // border: `${tokens.strokeWidthThicker} solid ${tokens.colorTransparentStroke}`,
    width: '100px',
    height: '100px',
  },
});

export const Default = (props: {} /* TODO: PresenceStagger props */) => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(!false);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
      </div>

      <div className={classes.items}>
        <PresenceStagger visible={visible}>
          <Fade>
            <div className={classes.item}>Item 1</div>
          </Fade>
          <Fade>
            <div className={classes.item}>Item 2</div>
          </Fade>
          <Fade>
            <div className={classes.item}>Item 3</div>
          </Fade>
          <Fade>
            <div className={classes.item}>Item 4</div>
          </Fade>
          <Fade>
            <div className={classes.item}>Item 5</div>
          </Fade>
          <Fade>
            <div className={classes.item}>Item 6</div>
          </Fade>
          <Fade>
            <div className={classes.item}>Item 7</div>
          </Fade>
          <Fade>
            <div className={classes.item}>Item 8</div>
          </Fade>
          <Fade>
            <div className={classes.item}>Item 9</div>
          </Fade>
          <Fade>
            <div className={classes.item}>Item 10</div>
          </Fade>
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
