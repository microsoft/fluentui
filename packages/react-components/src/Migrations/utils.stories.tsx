import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DocsContainer, Source } from '@storybook/addon-docs';
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
  const language = (value.includes(codeBlockTag)
    ? value.substring(3, value.indexOf('\n'))
    : 'jsx') as keyof typeof codeLanguages;
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

export const VersionPicker = () => {
  // TODO fetch this mapping from an azure function
  const versions: Record<string, string> = {
    '9.0.0-alpha.123': 'https://f6366b4--6002298f95a00c00213f4d55.chromatic.com',
    '9.0.0-beta.1': 'https://3c3fae8--6002298f95a00c00213f4d55.chromatic.com',
  };

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    window.parent.location.href = e.target.value;
  };

  return (
    <select onChange={onChange}>
      {Object.keys(versions).map(version => (
        <option value={versions[version]} key={version}>
          {version}
        </option>
      ))}
    </select>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const FluentDocsContainer = ({ children, context }) => {
  return (
    <>
      <VersionPicker />
      <DocsContainer context={context}>{children}</DocsContainer>
    </>
  );
};
