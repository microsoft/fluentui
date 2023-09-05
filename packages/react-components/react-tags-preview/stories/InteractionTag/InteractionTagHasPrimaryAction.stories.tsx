import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface, makeStyles, Tooltip, Link } from '@fluentui/react-components';
import { InteractionTag, InteractionTagPrimary, InteractionTagSecondary } from '@fluentui/react-tags-preview';
import { bundleIcon, HeartFilled, HeartRegular } from '@fluentui/react-icons';

const HeartIcon = bundleIcon(HeartFilled, HeartRegular);

const useStyles = makeStyles({
  popover: {
    width: '360px',
    maxWidth: '100%',
    height: 'fit-content',
  },
});

export const HasPrimaryAction = () => {
  const styles = useStyles();
  const [liked, setLiked] = React.useState(false);
  const toggleSecondary = () => setLiked(v => !v);
  return (
    <InteractionTag>
      <Popover>
        <PopoverTrigger>
          <InteractionTagPrimary hasSecondaryAction id="golden-retriever-primary">
            golden retriever
          </InteractionTagPrimary>
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
      <Tooltip content={liked ? 'unlike' : 'like'} relationship="label">
        <InteractionTagSecondary
          onClick={toggleSecondary}
          aria-labelledby="golden-retriever-primary golden-retriever-secondary"
          id="golden-retriever-secondary"
        >
          <HeartIcon filled={liked} />
        </InteractionTagSecondary>
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
