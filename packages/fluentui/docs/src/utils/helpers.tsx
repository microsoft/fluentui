import { Icon } from '@fluentui/react-northstar';
import * as React from 'react';
import { Link } from 'react-router-dom';

export const code = value => <code>{value}</code>;

export const link = (content: string, href: string) => {
  const isExternal = href.startsWith('http://') || href.startsWith('https://');
  const isAnchor = !isExternal && href.startsWith('#');

  if (isAnchor || isExternal) {
    return (
      <a href={`${isAnchor ? location.pathname : ''}${href}`} {...(isExternal && { target: 'blank' })}>
        {content} {isExternal ? <Icon name="external" size="small" /> : ''}
      </a>
    );
  }

  return <Link to={href}>{content}</Link>;
};
