import * as React from 'react';
import { CodeSnippet, renderElementToJSX } from '@fluentui/docs-components';
import { Box } from '@fluentui/react-northstar';

export type ExampleSnippetProps = {
  children?: React.ReactElement;
  render?: () => React.ReactElement;
  value?: string;
};

const rootStyle = ({ theme: { siteVariables } }) => ({
  color: siteVariables.bodyColor,
  background: siteVariables.bodyBackground,
  marginBottom: '2rem',
  boxShadow: '0 0 2px rgba(0, 0, 0, 0.2)',
});

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
    <Box styles={rootStyle}>
      <CodeSnippet value={string} fitted />
      {element && <div style={renderedStyle}>{element}</div>}
    </Box>
  );
};

export default ExampleSnippet;
