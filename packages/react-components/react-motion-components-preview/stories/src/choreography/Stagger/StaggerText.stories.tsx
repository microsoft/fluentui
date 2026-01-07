import * as React from 'react';
import StaggerTextDescription from './StaggerText.stories.md';
import { Field, makeStyles, tokens, Button, motionTokens, JSXElement } from '@fluentui/react-components';
import { Stagger, Scale } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
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
    width: '100%',
    height: '100%',
    padding: '50px',
  },
  item: {
    position: 'absolute',

    fontWeight: 'bold',
    fontSize: '100px',
    color: 'transparent',
    margin: tokens.spacingHorizontalXXS,
    // Prefer a CSS variable if available, fallback to the token value.
    // If your theme exposes a CSS var like --tokens-colorBrandStroke2 you can
    // control it there; otherwise the token is used.
    WebkitTextStroke: `4px var(--tokens-colorBrandStroke2, ${tokens.colorBrandStroke2})`,
    WebkitFilter: 'blur(1.2px)',
    filter: 'blur(1.2px)',
  },
});

export const Text = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(true);
  const outScale = visible ? 3 : 0;

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
              outScale={outScale}
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
