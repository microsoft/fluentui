import * as React from 'react';
import StaggerItemDelayDescription from './StaggerItemDelay.stories.md';
import { Field, makeStyles, tokens, Button, Label, Slider, JSXElement } from '@fluentui/react-components';
import { Stagger, Slide } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: tokens.spacingHorizontalXL,
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',
    gap: tokens.spacingVerticalM,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
    minWidth: '300px',
  },
  field: {
    flex: 1,
  },
  sliderField: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
  },
  items: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: tokens.colorNeutralBackgroundStatic,
    color: tokens.colorNeutralForegroundInverted,
    width: '40px',
    height: '100px',
    margin: tokens.spacingHorizontalXXS,
  },
});

export const ItemDelay = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(true);
  const [itemDelay, setItemDelay] = React.useState<number>(25);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Button appearance="primary" onClick={() => setVisible(v => !v)}>
            {visible ? 'Hide' : 'Show'}
          </Button>
        </Field>

        <div className={classes.sliderField}>
          <Label weight="semibold">Item Delay: {itemDelay}ms</Label>
          <Slider min={0} max={200} step={25} value={itemDelay} onChange={(_, data) => setItemDelay(data.value)} />
        </div>
      </div>

      <div className={classes.items}>
        <Stagger visible={visible} itemDelay={itemDelay}>
          {/* Create a list of items, each wrapped with a presence transition */}
          {Array.from({ length: 8 }, (_, i) => (
            <Slide key={`stagger-item-${i}`}>
              {/* Outer div protects the inner div from Slide's opacity animation */}
              <div>
                <div className={classes.item} style={{ opacity: 1 - 0.1 * i }}>
                  {i + 1}
                </div>
              </div>
            </Slide>
          ))}
        </Stagger>
      </div>
    </div>
  );
};

ItemDelay.parameters = {
  docs: {
    description: {
      story: StaggerItemDelayDescription,
    },
  },
};
