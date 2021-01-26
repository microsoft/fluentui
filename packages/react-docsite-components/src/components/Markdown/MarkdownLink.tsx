import * as React from 'react';
import { Link, ILinkProps } from '@fluentui/react/lib/Link';
import { removeAnchorLink } from '../../utilities/index2';
import { styled } from '@fluentui/react/lib/Utilities';

const MarkdownLinkBase: React.FunctionComponent<ILinkProps> = props => {
  let href = props.href;
  const { underline = true } = props;
  if (href && href[0] === '#' && href.indexOf('/') === -1) {
    // This is an anchor link within this page. We need to prepend the current route.
    href = removeAnchorLink(location.hash) + href;
  }

  return <Link {...props} href={href} underline={underline} />;
};
MarkdownLinkBase.displayName = 'MarkdownLink';

// Allow MarkdownLink to be targeted with Customizer
export const MarkdownLink: React.FunctionComponent<ILinkProps> = styled<ILinkProps, {}, {}>(
  MarkdownLinkBase,
  {},
  undefined,
  { scope: 'MarkdownLink' },
);
