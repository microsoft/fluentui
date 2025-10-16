import * as React from 'react';
import StaggerTextDescription from './StaggerText.stories.md';
import { Field, makeStyles, tokens, Button, motionTokens, JSXElement } from '@fluentui/react-components';
import { Stagger, Scale } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    // flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: tokens.spacingHorizontalXL,
    overflow: 'hidden',
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
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    // marginTop: '50px',
    padding: '50px',
  },
  item: {
    position: 'absolute',

    // top: '100px',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: tokens.colorNeutralBackgroundStatic,
    fontWeight: 'bold',
    fontSize: '100px',
    // Keep the fill color (white inverted foreground) and add a blue glow via text-shadow
    // color: tokens.colorNeutralForegroundInverted,
    // color: 'white',
    color: 'transparent',
    margin: tokens.spacingHorizontalXXS,
    WebkitTextStroke: '4px rgba(180, 214, 250, 0.7)', // colorBrandStroke2 = #b4d6fa
    WebkitFilter: 'blur(1.2px)',
    filter: 'blur(1.2px)',
    // Blue glow effect (primary visible glow + softer outer glows)
    // textShadow: '0 0 8px rgba(0,120,212,0.95), 0 0 20px rgba(0,120,212,0.6), 0 0 30px rgba(0,120,212,0.35)',
    // width: '100%',
    // height: '100%',
  },
});

// const ZoomTransition = createPresenceComponent({})

export const Text = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(!false);
  const fromScale = visible ? 3 : 0;

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Button appearance="primary" onClick={() => setVisible(v => !v)}>
            {visible ? 'Hide' : 'Show'}
          </Button>
        </Field>
      </div>

      <div className={classes.items}>
        <Stagger visible={visible} itemDelay={100}>
          {/* Create a list of items, each wrapped with a presence transition */}
          {Array.from({ length: 4 }, (_, i) => (
            <Scale
              fromScale={fromScale}
              duration={1200}
              exitDuration={1200}
              easing={motionTokens.curveDecelerateMax}
              exitEasing={motionTokens.curveAccelerateMid}
              key={`stagger-item-${i}`}
              unmountOnExit
              appear
            >
              <div className={classes.item}>STAGGER</div>
            </Scale>
          ))}
        </Stagger>
      </div>
    </div>
  );
};

Text.parameters = {
  docs: {
    description: {
      story: StaggerTextDescription,
    },
  },
};
