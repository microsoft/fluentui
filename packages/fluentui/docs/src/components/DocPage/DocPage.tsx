import * as React from 'react';
import DocumentTitle from 'react-document-title';
import { Header } from '@fluentui/react-northstar';

interface DocPageProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const DocPage = ({ title, description, children }: DocPageProps) => (
  <DocumentTitle title={`Fluent UI - ${title}`}>
    <div style={{ padding: '2rem', fontSize: '1.15rem', maxWidth: '100ch' }}>
      <Header as="h1" aria-level={2} content={title} description={description} align="center" />
      {children}
    </div>
  </DocumentTitle>
);

export default DocPage;
