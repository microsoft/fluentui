import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Text } from '@fluentui/react-components';

import styles from './TextAlignment.module.css';

export const Alignment = (): JSXElement => {
  return (
    <div className={styles.container}>
      <Text align="start">Aligned to start</Text>
      <Text align="center">Aligned to center</Text>
      <Text align="end">Aligned to end</Text>
      <Text align="justify">
        Justified text: Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium accusamus voluptate autem?
        Recusandae alias corporis dicta quisquam sequi molestias deleniti, libero necessitatibus, eligendi, omnis cumque
        enim asperiores quasi quidem sit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus repellat
        consectetur, sed aperiam ex nulla repellendus tempora vero illo aliquam autem! Impedit ipsa praesentium vero
        veritatis unde eos, fuga magnam!
      </Text>
    </div>
  );
};
