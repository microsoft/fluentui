import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DocsContainer, DocsContainerProps, Source } from '@storybook/addon-docs';
import { makeStyles } from '@fluentui/react-make-styles';
import {
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  MenuButton,
  FluentProvider,
  webLightTheme,
} from '../index';

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

interface VersionEntry {
  version: string;
  commit: string;
}

export const VersionPicker = () => {
  const [versions, setVersions] = React.useState<VersionEntry[]>([]);

  React.useEffect(() => {
    fetch('https://fluentstorybookversion.azurewebsites.net/api/GetVersions')
      .then(res => res.json())
      .then(json => {
        setVersions(json);
      });
  }, []);

  const navigateHandler = (commit: string) => () => {
    const href = `https://${commit}--6002298f95a00c00213f4d55.chromatic.com`;
    window.parent.location.href = href;
  };

  return (
    <FluentProvider theme={webLightTheme} style={{ position: 'sticky', top: 0 }}>
      <Menu>
        <MenuTrigger>
          <MenuButton>Select version</MenuButton>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            {versions.map(entry => (
              <MenuItem onClick={navigateHandler(entry.commit)} key={entry.version}>
                {entry.version}
              </MenuItem>
            ))}
          </MenuList>
        </MenuPopover>
      </Menu>
    </FluentProvider>
  );
};

export const FluentDocsContainer = ({ children, context }: DocsContainerProps & { children: React.ReactNode }) => {
  console.log(process.env.STORYBOOK_THEME);
  return (
    <>
      <VersionPicker />
      <DocsContainer context={context}>{children}</DocsContainer>
    </>
  );
};
