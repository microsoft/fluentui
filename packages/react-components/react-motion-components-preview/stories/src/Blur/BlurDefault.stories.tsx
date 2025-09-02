import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, makeStyles, tokens, Switch } from '@fluentui/react-components';
import { Blur } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: 'minmax(200px, 1fr) 2fr',
    gridTemplateAreas: '"controls content"',
    gap: '20px',
    padding: '20px',
  },
  content: {
    gridArea: 'content',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    padding: '20px',
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    maxWidth: '400px',
  },
  controls: {
    gridArea: 'controls',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '20px',
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

export const Default = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(true);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
      </div>

      <div className={classes.content}>
        <Blur visible={visible}>
          <div className={classes.card}>
            <LoremIpsum />
          </div>
        </Blur>
      </div>
    </div>
  );
};
