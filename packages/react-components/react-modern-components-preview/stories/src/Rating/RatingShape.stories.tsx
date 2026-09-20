import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { CircleFilled, CircleRegular, SquareFilled, SquareRegular } from '@fluentui/react-icons';
import { Rating } from '@fluentui/react-modern-components-preview/rating';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
});

export const Shape = (): React.ReactNode => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Rating iconFilled={CircleFilled} iconOutline={CircleRegular} step={0.5} />
      <Rating iconFilled={SquareFilled} iconOutline={SquareRegular} step={0.5} />
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
