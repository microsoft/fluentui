import * as React from 'react';
import { Link, ILinkProps } from 'office-ui-fabric-react/lib/Link';
import { removeAnchorLink } from '../../utilities/index2';

export const MarkdownLink: React.StatelessComponent<ILinkProps> = props => {
  let href = props.href;
  if (href && href[0] === '#' && href.indexOf('/') === -1) {
    // This is an anchor link within this page. We need to prepend the current route.
    href = removeAnchorLink(location.hash) + href;
  }

  return <Link {...props} href={href} />;
};
