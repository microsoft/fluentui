import * as React from 'react';
import { Button } from '@fluentui/react-northstar';
import { useCopyToClipboard } from '@fluentui/docs-components';
import { LinkIcon } from '@fluentui/react-icons-northstar';

export const GetShareableLink: React.FunctionComponent<{
  getShareableLink: () => string;
  style?: React.CSSProperties;
}> = ({ getShareableLink, style }) => {
  const [active, onCopy] = useCopyToClipboard(getShareableLink);
  return (
    <Button
      icon={<LinkIcon />}
      style={style}
      onClick={onCopy}
      disabled={active}
      content={active ? 'copied' : 'Get shareable link'}
    />
  );
};
