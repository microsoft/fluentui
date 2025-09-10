import { Field, makeStyles, tokens, Switch } from '@fluentui/react-components';
import { Collapse } from '@fluentui/react-motion-components-preview';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import description from './CollapseHorizontal.stories.md';

const useClasses = makeStyles({
  container: {},
  sideContent: {
    background: 'lightgrey',
    padding: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    gridArea: 'card',
    padding: '20px',
    width: '300px',
  },
  controls: {
    display: 'grid',
    gridTemplateColumns: '1fr 3fr',
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
      3,
    )}
  </>
);

export const Horizontal = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(false);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
      </div>

      <div style={{ display: 'flex' }}>
        <Collapse visible={visible} orientation="horizontal">
          {/* Wrapper div to make the collapse crop the card without reflowing the text. */}
          <div>
            <div className={classes.card}>
              <LoremIpsum />
            </div>
          </div>
        </Collapse>
        <div className={classes.sideContent}>[side content]</div>
      </div>
    </div>
  );
};

Horizontal.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
