import * as React from 'react';
import descriptionMd from './Description.md';
import { Flex, FlexItem, Provider, teamsTheme } from '@fluentui/react-northstar';
import { makeStyles } from '@fluentui/react-components';
import { Flex as FlexShim, flexItem } from '@fluentui/react-migration-v0-v9';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr',
    alignContent: 'center',
    alignItems: 'center',
    justifyItems: 'center',
    columnGap: '10px',
    rowGap: '10px',
    '> *': {
      width: '100%',
    },
  },
  v0Align: {
    // align: (value: "center" | "stretch" | "auto" | "end" | "start" | "baseline")
    ...flexItem.align('end'),
  },
  v0Push: {
    ...flexItem.pushRow(),
  },
});

export const Default = () => {
  const styles = useStyles();

  return (
    <Provider theme={teamsTheme} className={styles.root}>
      <div>
        <h3>v0</h3>
        <Flex>Flex content</Flex>
      </div>
      <div>
        <h3>Shim</h3>
        <FlexShim>Flex Shim Content</FlexShim>
      </div>
    </Provider>
  );
};

export const FlexItemAlign = () => {
  const styles = useStyles();

  return (
    <Provider theme={teamsTheme} className={styles.root}>
      <div>
        <h3>v0</h3>
        <Flex column>
          <FlexItem align="end">
            <div>Flex content</div>
          </FlexItem>
        </Flex>
      </div>
      <div>
        <h3>Shim</h3>
        <FlexShim column>
          <div className={styles.v0Align}>Flex Shim Content</div>
        </FlexShim>
      </div>
    </Provider>
  );
};

export const FlexItemPush = () => {
  const styles = useStyles();

  return (
    <Provider theme={teamsTheme} className={styles.root}>
      <div>
        <h3>v0</h3>
        <Flex>
          <button>Button 1</button>
          <FlexItem push>
            <div>Flex content</div>
          </FlexItem>
        </Flex>
      </div>
      <div>
        <h3>Shim</h3>
        <button>Button 1</button>
        <FlexShim>
          <div className={styles.v0Push}>Flex Shim Content</div>
        </FlexShim>
      </div>
    </Provider>
  );
};

export default {
  title: 'Migration Shims/V0/FlexShim',
  component: Flex,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
