import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Button } from '@fluentui/react-components';
import { ArrowReplyRegular, MoreHorizontalRegular, ShareRegular } from '@fluentui/react-icons';
import { CardFooter } from '@fluentui/react-components';

const useStyles = makeStyles({
  footer: {
    width: '300px',
  },
});

export const Default = (): JSXElement => {
  const styles = useStyles();

  return (
    <CardFooter
      className={styles.footer}
      action={<Button appearance="transparent" icon={<MoreHorizontalRegular />} aria-label="More options" />}
    >
      <Button icon={<ArrowReplyRegular />}>Reply</Button>
      <Button icon={<ShareRegular />}>Share</Button>
    </CardFooter>
  );
};
