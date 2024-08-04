import * as React from 'react';
import {
  DocsContext,
  ArgTypes,
  Title,
  Subtitle,
  Description,
  HeaderMdx,
  Primary,
  Stories,
} from '@storybook/addon-docs';
import type { SBEnumType } from '@storybook/csf';
import { makeStyles, shorthands, tokens, Link, Text } from '@fluentui/react-components';
import { InfoFilled } from '@fluentui/react-icons';
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
    display: 'grid',
    gridTemplateColumns: '1fr min-content',
  },
  nativeProps: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,

    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingHorizontalM,
    margin: `0 ${tokens.spacingHorizontalM}`,
  },
  nativePropsIcon: {
    alignSelf: 'center',
    color: tokens.colorBrandForeground1,
    fontSize: '24px',
  },
  nativePropsMessage: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
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

const getNativeElementsList = (elements: SBEnumType['value']): JSX.Element => {
  const elementsArr = elements.map((el, idx) => [
    <code key={idx}>{`<${el}>`}</code>,
    idx !== elements.length - 1 ? ', ' : ' ',
  ]);

  return (
    <>
      {elementsArr}
      {elementsArr.length > 1 ? 'elements' : 'element'}
    </>
  );
};

export const FluentDocsPage = () => {
  const context = React.useContext(DocsContext);
  const stories = context.componentStories();
  const primaryStory = stories[0];
  const primaryStoryContext = context.getStoryContext(primaryStory);

  const dir = primaryStoryContext.parameters?.dir ?? primaryStoryContext.globals?.[DIR_ID] ?? 'ltr';
  const selectedTheme = themes.find(theme => theme.id === primaryStoryContext.globals![THEME_ID]);

  const videos = primaryStoryContext.parameters?.videos ?? null;
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
    <div className="sb-unstyled">
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
          <ArgTypes of={primaryStory.component} />
          {primaryStory.argTypes.as && primaryStory.argTypes.as?.type?.name === 'enum' && (
            <div className={styles.nativeProps}>
              <InfoFilled className={styles.nativePropsIcon} />
              <div className={styles.nativePropsMessage}>
                <b>
                  Native props are supported <span role="presentation">🙌</span>
                </b>
                <span>
                  All HTML attributes native to the {getNativeElementsList(primaryStory.argTypes.as.type.value)},
                  including all <code>aria-*</code> and <code>data-*</code> attributes, can be applied as native props
                  on this component.
                </span>
              </div>
            </div>
          )}
          <Stories />
        </div>
        <div className={styles.toc}>
          <Toc stories={stories} />
        </div>
      </div>
    </div>
  );
};
