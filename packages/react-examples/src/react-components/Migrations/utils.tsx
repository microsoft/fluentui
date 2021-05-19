import * as React from 'react';
import { Source } from '@storybook/addon-docs/blocks';
import { makeStyles } from '@fluentui/react-make-styles';

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

export const CodeLanguages: { [key: string]: string } = {
  html: 'HTML',
  css: 'CSS',
  js: 'JavaScript',
  jsx: 'React',
};
export const CodeExample = (props: { title?: string; children: React.ReactElement }) => {
  const { title, children } = props;
  // Access the raw values from the markdown source code block
  const rawValue: string = children?.props?.children?.props?.children;
  const isMarkdownCodeBlock = rawValue !== undefined;

  if (!isMarkdownCodeBlock) {
    return children;
  }

  // JSX source blocks are passed without the backticks
  const language = rawValue.indexOf('```') == 0 ? rawValue.substring(3, rawValue.indexOf('\n')) : 'jsx';
  const code = rawValue
    .replace(/```${language}/, '')
    .replace('```', '')
    .trim();

  return (
    <div>
      <h3>{title ?? CodeLanguages[language]}</h3>
      <Source language={language} code={code} />
    </div>
  );
};
