import React = require('react');
import { Source } from '@storybook/addon-docs/blocks';
import { makeStyles } from '@fluentui/react-make-styles';

const codeComparisonUseStyles = makeStyles({
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
  const classes = codeComparisonUseStyles();

  return <div className={classes.root}>{children}</div>;
};

export const CodeLanguages: { [key: string]: string } = {
  css: 'CSS',
  js: 'JavaScript',
};
export const CodeExample = (props: { title?: string; children: React.ReactElement }) => {
  const { title, children } = props;
  const rawValue: string = children?.props?.children?.props?.children;
  const isMarkdownCodeBlock = rawValue !== undefined;

  if (isMarkdownCodeBlock) {
    const language = rawValue.substring(3, rawValue.indexOf('\n'));
    const code = rawValue
      .replace(`\`\`\`${language}`, '')
      .replace('```', '')
      .trim();

    return (
      <div>
        <h3>{title ?? CodeLanguages[language]}</h3>
        <Source language={language} code={code} />
      </div>
    );
  }

  return children;
};
