import * as React from 'react';
import {
  DocsContext,
  ArgsTable,
  Title,
  Subtitle,
  Description,
  HeaderMdx,
  Primary,
  PRIMARY_STORY,
  Stories,
} from '@storybook/addon-docs';
import { makeStyles, shorthands } from '@griffel/react';
import { Toc, nameToHash } from './Toc.stories';
import { DIR_ID, THEME_ID, themes } from '@fluentui/react-storybook-addon';
import { DirSwitch } from './DirSwitch.stories';
import { ThemePicker } from './ThemePicker.stories';

const useStyles = makeStyles({
  divider: {
    height: '1px',
    backgroundColor: '#e1dfdd',
    ...shorthands.border('0px', 'none'),
    ...shorthands.margin('48px', '0px'),
  },
  wrapper: {
    display: 'flex',
    ...shorthands.gap('16px'),
  },
  toc: {
    flexBasis: '200px',
    flexShrink: 0,
    [`@media screen and (max-width: 1000px)`]: {
      display: 'none',
    },
  },
  container: {
    // without a width, this div grows wider than its parent
    width: '200px',
    flexGrow: 1,
  },
});

export const FluentDocsPage = () => {
  const context = React.useContext(DocsContext);

  const dir = context.parameters?.dir ?? context.globals?.[DIR_ID] ?? 'ltr';
  const selectedTheme = themes.find(theme => theme.id === context.globals![THEME_ID]);
  const stories = context.componentStories();
  const primaryStory = stories[0];
  const styles = useStyles();
  // DEBUG
  // console.log('FluentDocsPage', context);
  // console.table(stories.map((s: StoreItem) => ({ id: s.id, kind: s.kind, name: s.name, story: s.story })));
  // console.table(
  //   Object.values((context as any).argTypes).map(arg => ({
  //     name: arg.name,
  //     description: arg.description,
  //     type: arg.table?.type?.summary ?? '?',
  //     default: arg.table?.defaultValue?.summary ?? '-',
  //   })),
  // );

  return (
    <div>
      <Title />

      <div className={styles.wrapper}>
        <div className={styles.container}>
          <ThemePicker selectedThemeId={selectedTheme?.id} />
          <DirSwitch dir={dir} />
          <Subtitle />
          <Description />
          <hr className={styles.divider} />
          <HeaderMdx as="h3" id={nameToHash(primaryStory.name)}>
            {primaryStory.name}
          </HeaderMdx>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </div>
        <div className={styles.toc}>
          <Toc stories={stories} />
        </div>
      </div>
    </div>
  );
};
