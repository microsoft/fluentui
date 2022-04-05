import * as React from 'react';
import DocumentTitle from 'react-document-title';
import { Header } from '@fluentui/react-northstar';

interface DocPageProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  fluid?: boolean;
  themeSwitcher?: React.ReactNode;
}

const PAGE_PADDING = '20px';
const DocPage = ({ title, themeSwitcher, children, fluid }: DocPageProps) => (
  <>
    <div
      id="docs-sticky-header"
      style={{
        position: 'sticky',
        padding: `${PAGE_PADDING} ${PAGE_PADDING} 10px ${PAGE_PADDING}`,
        top: 0,
        background: '#DDDDDD88',
        borderBottom: '1px solid #00000022',
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
      }}
    >
      {themeSwitcher}
      <Header as="h1" aria-level={2} content={title} style={{ margin: 0 }} variables={{ color: 'black' }} />
      <DocumentTitle title={`Fluent UI - ${title}`} />
    </div>
    <div
      style={{
        padding: '2rem',
        fontSize: '1.15rem',
        maxWidth: fluid ? undefined : '100ch',
      }}
    >
      {children}
    </div>
  </>
);

export default DocPage;
