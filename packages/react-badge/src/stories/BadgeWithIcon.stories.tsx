import * as React from 'react';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Badge } from '@fluentui/react-badge';
import { ClipboardPaste20Regular as PasteIcon } from '@fluentui/react-icons';

export const BadgeWithIcon = () => {
  return <Badge size="medium" icon={<PasteIcon />} />;
};

BadgeWithIcon.parameters = {
  docs: {
    description: {
      story: 'A Badge can contain an icon',
    },
  },
};
