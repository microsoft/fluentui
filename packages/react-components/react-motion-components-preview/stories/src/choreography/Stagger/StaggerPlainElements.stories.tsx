import * as React from 'react';
import StaggerPlainElementsDescription from './StaggerPlainElements.stories.md';
import { Field, makeStyles, tokens, Button, JSXElement } from '@fluentui/react-components';
import { Stagger } from '@fluentui/react-motion-components-preview';

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

export const PlainElements = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(true);

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
        <Stagger visible={visible}>
          {/* Create a list of plain divs */}
          {Array.from({ length: 8 }, (_, i) => (
            <div className={classes.item} style={{ opacity: 1 - 0.1 * i }} key={`stagger-item-${i}`}>
              {i + 1}
            </div>
          ))}
        </Stagger>
      </div>
    </div>
  );
};

PlainElements.parameters = {
  docs: {
    description: {
      story: StaggerPlainElementsDescription,
    },
  },
};
