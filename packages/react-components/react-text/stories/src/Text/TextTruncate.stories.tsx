import * as React from 'react';
import { makeStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
  text: {
    overflow: 'hidden',
    width: '240px',
    display: 'block',
  },
});

export const Truncate = () => {
  const styles = useStyles();

  return (
    <Text truncate wrap={false} className={styles.text}>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere aliquam nisi numquam, fugit recusandae eligendi
      aspernatur odio minus? Incidunt maxime ipsam dolorem quia quas aliquam, quasi consequatur! Ea, minus eaque.
    </Text>
  );
};
