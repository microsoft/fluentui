import * as React from 'react';
import { ItemLayout } from '@fluentui/react-northstar';
import { MentionIcon, ErrorIcon } from '@fluentui/react-icons-northstar';

const ItemLayoutExampleRtlShorthand = () => (
  <>
    <ItemLayout
      content="Welcome"
      contentMedia={<MentionIcon />}
      header="Alice"
      headerMedia="Yesterday"
      media={<ErrorIcon />}
    />
    <ItemLayout
      content="Welcome"
      contentMedia={<MentionIcon />}
      header="הויפט זייט"
      headerMedia="Yesterday"
      media={<ErrorIcon />}
    />
  </>
);

export default ItemLayoutExampleRtlShorthand;
