import * as React from 'react';
import { makeStyles, Button } from '@fluentui/react-components';
import { ArrowReply16Regular, MoreHorizontal20Regular, Share16Regular } from '@fluentui/react-icons';
import { CardFooter } from '@fluentui/react-components';

const useStyles = makeStyles({
  footer: {
    width: '300px',
  },
});

export const Default = () => {
  const styles = useStyles();

  return (
    <CardFooter
      className={styles.footer}
      action={<Button appearance="transparent" icon={<MoreHorizontal20Regular />} />}
    >
      <Button icon={<ArrowReply16Regular />}>Reply</Button>
      <Button icon={<Share16Regular />}>Share</Button>
    </CardFooter>
  );
};
