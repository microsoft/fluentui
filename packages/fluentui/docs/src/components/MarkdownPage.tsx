import * as React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { CodeSnippet } from '@fluentui/docs-components';
import { Header } from '@fluentui/react-northstar';
import { RouteProps } from 'react-router-dom';

import { link } from '../utils/helpers';
import DocPage from './DocPage';
import GuidesNavigationFooter, { PageDescriptor } from './GuidesNavigationFooter';

type MarkdownPageProps = {
  page: {
    default: React.ComponentType<any>;
    meta: {
      previous?: PageDescriptor;
      next?: PageDescriptor;
      title: string;
    };
  };
} & RouteProps;

const components = {
  a: ({ children, href }) => link(children, href),
  code: ({ className, children, fitted, label }) =>
    className ? (
      <CodeSnippet fitted={fitted} mode={className.replace('language-', '')} label={label} value={children} />
    ) : (
      <code>{children}</code>
    ),
  h1: ({ children }) => (
    <Header
      as="h1"
      content={children}
      styles={({ theme: { siteVariables } }) => ({ color: siteVariables.colors.grey[750] })}
    />
  ),
  h2: ({ children }) => (
    <Header
      as="h2"
      content={children}
      styles={({ theme: { siteVariables } }) => ({ color: siteVariables.colors.grey[750] })}
    />
  ),
  h3: ({ children }) => (
    <Header
      as="h3"
      content={children}
      styles={({ theme: { siteVariables } }) => ({ color: siteVariables.colors.grey[750] })}
    />
  ),
  img: props => <img style={{ maxWidth: '100%' }} {...props} />,
};

const MarkdownPage: React.FunctionComponent<MarkdownPageProps> = props => {
  const { page } = props;
  const { default: Component, meta } = page;

  return (
    <DocPage title={meta.title}>
      <MDXProvider components={components}>
        <Component />
      </MDXProvider>
      <GuidesNavigationFooter previous={meta.previous} next={meta.next} />
    </DocPage>
  );
};

export default MarkdownPage;
