import * as React from 'react';
import { Button } from '@fluentui/react-northstar';
import { useCopyToClipboard } from '@fluentui/docs-components';

export const GetShareableLink: React.FunctionComponent<{
  getShareableLink: () => string;
  style?: React.CSSProperties;
}> = ({ getShareableLink, style }) => {
  const [active, onCopy] = useCopyToClipboard(getShareableLink);
  return (
    <Button style={style} onClick={onCopy} disabled={active}>
      {active ? 'copied' : 'Get shareable link'}
    </Button>
  );
};
