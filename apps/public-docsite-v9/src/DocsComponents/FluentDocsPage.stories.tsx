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
import { makeStyles, shorthands, tokens, Link, Text } from '@fluentui/react-components';
import { DIR_ID, THEME_ID, themes } from '@fluentui/react-storybook-addon';
import { DirSwitch } from './DirSwitch.stories';
import { ThemePicker } from './ThemePicker.stories';
import { Toc, nameToHash } from './Toc.stories';

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
  globalTogglesContainer: {
    columnGap: tokens.spacingHorizontalXXXL,
    display: 'flex',
  },
  description: {
    display: 'flex',
  },
});

const useVideoClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingHorizontalMNudge),
  },
  preview: {
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingHorizontalM),
    backgroundColor: tokens.colorNeutralBackground2,

    ':hover': {
      backgroundColor: tokens.colorNeutralBackground2Hover,
    },
  },
  image: {
    width: '200px',
  },
});

const VideoPreviews: React.FC<{
  videos: {
    href: string;
    preview: string;
    source: 'youtube';
    title: string;
  }[];
}> = props => {
  const { videos } = props;
  const classes = useVideoClasses();

  return (
    <div className={classes.container}>
      {videos.map(video => (
        <Link className={classes.preview} href={video.href} target="_blank" key={video.href}>
          <img alt={`Video: ${video.preview}`} src={video.preview} className={classes.image} />
          <Text>{video.title}</Text>
        </Link>
      ))}
    </div>
  );
};

export const FluentDocsPage = () => {
  const context = React.useContext(DocsContext);

  const dir = context.parameters?.dir ?? context.globals?.[DIR_ID] ?? 'ltr';
  const selectedTheme = themes.find(theme => theme.id === context.globals![THEME_ID]);
  const stories = context.componentStories();
  const primaryStory = stories[0];
  const videos = context.parameters?.videos ?? null;
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
          <div className={styles.globalTogglesContainer}>
            <ThemePicker selectedThemeId={selectedTheme?.id} />
            <DirSwitch dir={dir} />
          </div>
          <Subtitle />
          <div className={styles.description}>
            <Description />
            {videos && <VideoPreviews videos={videos} />}
          </div>
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
