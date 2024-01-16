import * as React from 'react';
import { Rating } from '@fluentui/react-rating-preview';
import { CircleFilled, CircleRegular, SquareFilled, SquareRegular } from '@fluentui/react-icons';
import { makeStyles, shorthands } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('10px'),
  },
});

export const Shape = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Rating iconFilled={<CircleFilled />} iconOutline={<CircleRegular />} step={0.5} />
      <Rating iconFilled={<SquareFilled />} iconOutline={<SquareRegular />} />
    </div>
  );
};

Shape.parameters = {
  docs: {
    description: {
      story:
        'You can pass in custom icons to the Rating component. You can specify the icons with the `iconFilled` and `iconOutline` props.',
    },
  },
};
