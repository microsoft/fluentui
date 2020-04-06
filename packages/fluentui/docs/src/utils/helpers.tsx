import * as React from 'react';
import { Link } from 'react-router-dom';
// TODO: find replacement
import { OpenOutsideIcon } from '@fluentui/react-icons-northstar';

export const code = value => <code>{value}</code>;

export const link = (content: string, href: string) => {
  const isExternal = href.startsWith('http://') || href.startsWith('https://');
  const isAnchor = !isExternal && href.startsWith('#');

  if (isAnchor || isExternal) {
    return (
      <a href={`${isAnchor ? location.pathname : ''}${href}`} {...(isExternal && { target: 'blank' })}>
        {content} {isExternal ? <OpenOutsideIcon size="small" /> : ''}
      </a>
    );
  }

  return <Link to={href}>{content}</Link>;
};
