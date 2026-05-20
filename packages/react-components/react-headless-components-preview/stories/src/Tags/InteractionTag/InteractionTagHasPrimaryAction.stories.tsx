import * as React from 'react';
import { InteractionTag } from '@fluentui/react-headless-components-preview/interaction-tag';
import { InteractionTagPrimary } from '@fluentui/react-headless-components-preview/interaction-tag-primary';
import { InteractionTagSecondary } from '@fluentui/react-headless-components-preview/interaction-tag-secondary';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';
import { DismissRegular } from '@fluentui/react-icons';

import styles from './interactionTag.module.css';

export const HasPrimaryAction = (): React.ReactNode => (
  <InteractionTag className={styles.interactionTag}>
    <Popover>
      <PopoverTrigger>
        <InteractionTagPrimary className={styles.primary} hasSecondaryAction>
          Golden retriever
        </InteractionTagPrimary>
      </PopoverTrigger>
      <PopoverSurface className={styles.popover}>
        <a href="https://en.wikipedia.org/wiki/Golden_Retriever">Find out more on wiki</a>
        <ul>
          <li>Medium to large-sized breed</li>
          <li>Dense, water-repellent coat</li>
          <li>Golden or cream color</li>
          <li>Friendly, intelligent</li>
        </ul>
      </PopoverSurface>
    </Popover>
    <InteractionTagSecondary aria-label="dismiss" className={styles.secondary}>
      <DismissRegular aria-hidden />
    </InteractionTagSecondary>
  </InteractionTag>
);

HasPrimaryAction.parameters = {
  docs: {
    description: {
      story:
        'An InteractionTag can host a primary action - here, the primary opens a headless Popover. The secondary remains the dismiss affordance.',
    },
  },
};
