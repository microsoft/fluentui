import * as React from 'react';
import { Source } from '@storybook/addon-docs';
import { makeStyles } from '@fluentui/react-components';

const useCodeComparisonStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',

    '> *': {
      width: '100%',
    },

    '> :not(:last-child)': {
      marginRight: '5%',
    },
  },
});

export const CodeComparison = (props: { children: React.ReactElement[] }) => {
  const { children } = props;
  const classes = useCodeComparisonStyles();

  return <div className={classes.root}>{children}</div>;
};

const codeLanguages = {
  html: 'HTML',
  css: 'CSS',
  js: 'JavaScript',
  jsx: 'React',
};
export const CodeExample = (props: { title?: string; children: React.ReactElement }) => {
  const { title, children } = props;
  // Access the raw values from the markdown source code block
  const markdownCodeBlockValue: string | undefined = children?.props?.children?.props?.children;

  if (markdownCodeBlockValue === undefined) {
    return children;
  }

  const value: string = markdownCodeBlockValue.trim();
  const codeBlockTag = '```';
  // JSX source blocks are passed without the backticks
  const language = (
    value.includes(codeBlockTag) ? value.substring(3, value.indexOf('\n')) : 'jsx'
  ) as keyof typeof codeLanguages;
  const code = value
    .replace(codeBlockTag + language, '')
    .replace(codeBlockTag, '')
    .trim();

  return (
    <div>
      <h3>{title ?? codeLanguages[language]}</h3>
      <Source language={language} code={code} />
    </div>
  );
};
