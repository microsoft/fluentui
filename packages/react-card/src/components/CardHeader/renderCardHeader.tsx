import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { CardHeaderState } from './CardHeader.types';
import { cardHeaderShorthandPropsCompat } from './useCardHeader';
import { makeStyles } from '@fluentui/react-make-styles';

const useStyles = makeStyles({
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: 'inherit',

    '> *': {
      height: '50%',
    },
  },
});

/**
 * Render the final JSX of CardHeader
 */
export const renderCardHeader = (state: CardHeaderState) => {
  const { slots, slotProps } = getSlotsCompat(state, cardHeaderShorthandPropsCompat);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const styles = useStyles();

  return (
    <slots.root {...slotProps.root}>
      <slots.image {...slotProps.image} />
      {/* TODO: Consider exposing this with a slot */}
      <div className={styles.textContainer}>
        <slots.header {...slotProps.header} />
        <slots.description {...slotProps.description} />
      </div>
      <slots.action {...slotProps.action} />
    </slots.root>
  );
};
