import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import descriptionMd from './Description.md';
import { Slider, Provider, teamsTheme } from '@fluentui/react-northstar';
import { Slider as V9Slider, useId } from '@fluentui/react-components';

import styles from './index.module.css';

export const Fluid = (): JSXElement => {
  const id = useId('sliders');

  return (
    <Provider theme={teamsTheme} className={styles.root}>
      <div>
        <h3 id={`${id}-v0`}>v0</h3>
        <Slider aria-labelledby={`${id}-v0`} fluid />
      </div>

      <div>
        <h3 id={`${id}-v9`}>V9 With mixin</h3>
        {/*
         * `styles.fluid` (index.module.css) snapshots the output of `slider.fluid()`
         * from `@fluentui/react-migration-v0-v9`.
         */}
        <V9Slider aria-labelledby={`${id}-v9`} className={styles.fluid} />
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
