import * as React from 'react';
import {
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
  Popover,
  PopoverTrigger,
  PopoverSurface,
  makeStyles,
  Tooltip,
  Link,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  popover: {
    width: '360px',
    maxWidth: '100%',
    height: 'fit-content',
  },
});

export const HasPrimaryAction = () => {
  const styles = useStyles();
  return (
    <InteractionTag>
      <Popover trapFocus>
        <PopoverTrigger>
          <InteractionTagPrimary hasSecondaryAction>Golden retriever</InteractionTagPrimary>
        </PopoverTrigger>
        <PopoverSurface className={styles.popover}>
          <Link href="https://en.wikipedia.org/wiki/Golden_Retriever">Find out more on wiki</Link>
          <ul>
            <li>Size: Medium to large-sized dog breed. </li>
            <li>Coat: Luxurious double coat with a dense, water-repellent outer layer and a soft, dense undercoat.</li>
            <li>Color: Typically a luscious golden or cream color, with variations in shade.</li>
            <li>Build: Sturdy and well-proportioned body with a friendly and intelligent expression.</li>
          </ul>
        </PopoverSurface>
      </Popover>
      <Tooltip content="dismiss" relationship="label">
        <InteractionTagSecondary />
      </Tooltip>
    </InteractionTag>
  );
};

HasPrimaryAction.storyName = 'Has Primary Action';
HasPrimaryAction.parameters = {
  docs: {
    description: {
      story:
        'An InteractionTag can have a primary action. This example shows an Interaction Tag that opens a popover as Primary Action.',
    },
  },
};
