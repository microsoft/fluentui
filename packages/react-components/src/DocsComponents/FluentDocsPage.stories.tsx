import * as React from 'react';
import { DocsContext, ArgsTable, Title, Subtitle, Description, PRIMARY_STORY } from '@storybook/addon-docs';
import { makeStyles, shorthands } from '@griffel/react';
import { KnownIssues } from './KnownIssues.stories';
import { Toc } from './Toc.stories';
import { isHosted } from './isHosted';
import { FluentDocsDocsStory } from './FluentDocsDocsStory.stories';
import { THEME_ID } from '../../../react-storybook-addon/src/index';
import { defaultTheme, themes } from '../../../react-storybook-addon/src/theme';

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
    flexGrow: 1,
    minWidth: 0,
  },
  // style overrides for when hosted in website
  hosted: {
    '& h1': {
      marginTop: '-12px !important',
    },
  },
});

export const FluentDocsPage = () => {
  const context = React.useContext(DocsContext);
  const stories = context.componentStories();
  const primaryStory = stories[0];
  const hosted = isHosted();
  const styles = useStyles();
  const componentName = context.title.split('/').pop()?.replace(new RegExp(' ', 'g'), '') ?? 'Unknown';

  // eslint-disable-next-line deprecation/deprecation
  const fluentThemeID = (context.globals && context.globals[THEME_ID]) ?? defaultTheme.id;
  const fluentThemeExportName = themes.find(theme => theme.id === fluentThemeID)?.exportName ?? 'webLightTheme';

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
    <div className={hosted ? styles.hosted : ''}>
      <Title />

      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Subtitle />
          <Description />
          <hr className={styles.divider} />
          {stories.map((story, index) => (
            <React.Fragment key={index}>
              <FluentDocsDocsStory
                {...story}
                componentName={componentName}
                fluentThemeExportName={fluentThemeExportName}
              />
              {story === primaryStory && <ArgsTable story={PRIMARY_STORY} />}
            </React.Fragment>
          ))}
          <KnownIssues componentName={componentName} />
        </div>
        <div className={styles.toc}>
          <Toc stories={[...stories, { id: 'known-issues', name: 'Known issues' }]} />
        </div>
      </div>
    </div>
  );
};
