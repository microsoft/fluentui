import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button } from '@fluentui/react-components';
import { ArrowReply16Regular, MoreHorizontal20Regular, Share16Regular } from '@fluentui/react-icons';
import { CardFooter } from '@fluentui/react-components';

import styles from './CardFooterDefault.module.css';

export const Default = (): JSXElement => {
  return (
    <CardFooter
      className={styles.footer}
      action={<Button appearance="transparent" icon={<MoreHorizontal20Regular />} aria-label="More options" />}
    >
      <Button icon={<ArrowReply16Regular />}>Reply</Button>
      <Button icon={<Share16Regular />}>Share</Button>
    </CardFooter>
  );
};
