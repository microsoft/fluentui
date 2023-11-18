import * as React from 'react';
import descriptionMd from './Description.md';
import { Slider, Provider, teamsTheme } from '@fluentui/react-northstar';
import { makeStyles, Slider as V9Slider } from '@fluentui/react-components';
import { slider } from '@fluentui/react-migration-v0-v9';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  fluid: {
    ...slider.fluid(),
  },
});

export const Fluid = () => {
  const styles = useStyles();

  return (
    <Provider theme={teamsTheme} className={styles.root}>
      <div>
        <h3>v0</h3>
        <Slider fluid />
      </div>

      <div>
        <h3>V9 With mixin</h3>
        {/*
         * const useStyles = makeStyles({
         *   fluid: {
         *     ...slider.fluid();
         *   }
         * })
         */}
        <V9Slider className={styles.fluid} />
      </div>
    </Provider>
  );
};

export default {
  title: 'Migration Shims/V0/SliderMixin',
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
