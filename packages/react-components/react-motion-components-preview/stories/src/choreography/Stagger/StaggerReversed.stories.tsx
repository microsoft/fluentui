import * as React from 'react';
import StaggerReversedDescription from './StaggerReversed.stories.md';
import { Field, makeStyles, tokens, Button } from '@fluentui/react-components';
import { Stagger, Slide } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    // flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: tokens.spacingHorizontalXL,
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

export const Reversed = () => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(false);

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
        <Stagger visible={visible} reversed>
          {/* Create a list of items, each wrapped with a presence transition */}
          {Array.from({ length: 8 }, (_, i) => (
            <Slide key={`stagger-item-${i}`}>
              <div className={classes.item}>{i + 1}</div>
            </Slide>
          ))}
        </Stagger>
      </div>
    </div>
  );
};

Reversed.parameters = {
  docs: {
    description: {
      story: StaggerReversedDescription,
    },
  },
};
