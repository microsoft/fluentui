import { CodeSnippet, renderElementToJSX } from '@fluentui/docs-components';
import * as React from 'react';

export type ExampleSnippetProps = {
  children?: React.ReactElement;
  render?: () => React.ReactElement;
  value?: string;
};

const rootStyle = {
  background: 'white',
  marginBottom: '2rem',
  boxShadow: '0 0 2px rgba(0, 0, 0, 0.2)',
};

const renderedStyle = {
  padding: '1rem',
};

const ExampleSnippet: React.FunctionComponent<ExampleSnippetProps> = props => {
  const { children, render = () => null, value } = props;

  const child: React.ReactElement | null = render() || children;
  const element: React.ReactElement = child ? React.Children.only(child) : null;

  const isFunctionWithoutValue = render && !value;
  const string = value || renderElementToJSX(element, !isFunctionWithoutValue);

  return (
    <div style={rootStyle}>
      <CodeSnippet value={string} fitted />
      {element && <div style={renderedStyle}>{element}</div>}
    </div>
  );
};

export default ExampleSnippet;
