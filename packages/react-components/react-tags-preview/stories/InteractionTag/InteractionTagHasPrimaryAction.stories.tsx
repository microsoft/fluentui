import * as React from 'react';
import { Popover, PopoverTrigger, Button, PopoverSurface, makeStyles } from '@fluentui/react-components';
import { InteractionTag } from '@fluentui/react-tags-preview';

const useStyles = makeStyles({
  popover: {
    width: '360px',
    maxWidth: '100%',
    height: 'fit-content',
  },
  popoverHeader: {
    display: 'flex',
    columnGap: '10px',
    alignItems: 'center',
  },
});

export const HasPrimaryAction = () => {
  const styles = useStyles();

  const [dismiss, setDismiss] = React.useState(false);
  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDismiss(true);
  };

  return dismiss ? (
    <Button onClick={() => setDismiss(false)}>restore tag</Button>
  ) : (
    <Popover>
      <PopoverTrigger>
        <InteractionTag dismissible dismissButton={{ onClick: handleDismiss }}>
          Golden Retriever
        </InteractionTag>
      </PopoverTrigger>
      <PopoverSurface className={styles.popover}>
        <ul>
          <li>Size: Medium to large-sized dog breed. </li>
          <li>Coat: Luxurious double coat with a dense, water-repellent outer layer and a soft, dense undercoat.</li>
          <li>Color: Typically a luscious golden or cream color, with variations in shade.</li>
          <li>Build: Sturdy and well-proportioned body with a friendly and intelligent expression.</li>
        </ul>
      </PopoverSurface>
    </Popover>
  );
};

HasPrimaryAction.storyName = 'Has Primary Action';
HasPrimaryAction.parameters = {
  docs: {
    description: {
      story: 'A InteractionTag can have a primary action. This example shows an Interaction Tag that opens a popover.',
    },
  },
};
