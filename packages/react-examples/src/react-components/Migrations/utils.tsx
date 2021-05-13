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

// Refer to the links below for supported languages.
// Docs: https://storybook.js.org/docs/react/writing-docs/doc-blocks#mdx-2
// Source: https://github.com/storybookjs/storybook/blob/master/lib/components/src/syntaxhighlighter/syntaxhighlighter.tsx
export enum CodeLanguage {
  JavaScript,
  JSX,
  Json,
  YML,
  Md,
  Bash,
  CSS,
  HTML,
  TSX,
  TypeScript,
  GraphQL,
}
export const CodeSource = (props: { title?: string; language: CodeLanguage; children: string }) => {
  const { title, language, children } = props;
  const languageName = CodeLanguage[language];

  return (
    <div>
      <h3>{title ?? languageName}</h3>
      <Source language={languageName.toLowerCase()} code={children} />
    </div>
  );
};
