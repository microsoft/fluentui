import * as React from 'react';
import {
  DocsContext,
  ArgsTable,
  Title,
  Subtitle,
  Description,
  HeaderMdx,
  Primary,
  Stories,
  type DocsContextProps,
} from '@storybook/addon-docs';
import type { PreparedStory, Renderer, SBEnumType } from '@storybook/types';
import { makeStyles, shorthands, tokens, Link, Text } from '@fluentui/react-components';
import { InfoFilled } from '@fluentui/react-icons';
import { DIR_ID, THEME_ID, themes } from '@fluentui/react-storybook-addon';
import { DirSwitch } from './DirSwitch.stories';
import { ThemePicker } from './ThemePicker.stories';
import { Toc, nameToHash } from './Toc.stories';

type PrimaryStory = PreparedStory<Renderer>;

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
  additionalInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingHorizontalM,
    margin: `0 ${tokens.spacingHorizontalM}`,
  },
  additionalInfoIcon: {
    alignSelf: 'center',
    color: tokens.colorBrandForeground1,
    fontSize: '24px',
    marginRight: tokens.spacingHorizontalM,
  },
  additionalInfoMessage: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacingVerticalXS,
  },
  infoIcon: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
    flex: 1,
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
  const elementsArr = elements?.map((el, idx) => [
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

const slotRegex = /as\?:\s*"([^"]+)"/;
/**
 * NOTE: this function mutates original story argTypes including all story subcomponents if they are present
 */
function withSlotEnhancer(story: PreparedStory) {
  const hasArgAsProp = story.argTypes.as?.type?.name === 'enum';
  const argAsProp = hasArgAsProp ? (story.argTypes.as.type as SBEnumType).value : null;
  let hasArgAsSlot = false;

  type InternalComponentApi = {
    __docgenInfo: {
      props?: Record<string, { type: { name: string } }>;
    };
    [k: string]: unknown;
  };

  const transformPropsWithSlotShorthand = (props: Record<string, { type: { name: string } }>) => {
    Object.entries(props).forEach(([key, argType]) => {
      const value: string = argType?.type?.name;
      if (value.includes('WithSlotShorthandValue')) {
        hasArgAsSlot = true;
        const match = value.match(slotRegex);
        if (match) {
          props[key].type.name = `Slot<\"${match[1]}\">`;
        } else {
          props[key].type.name = `Slot`;
        }
      }
    });
  };

  const transformComponent = (component: InternalComponentApi) => {
    const docGenProps = component?.__docgenInfo?.props;
    if (docGenProps) {
      transformPropsWithSlotShorthand(docGenProps);
    }
  };

  const component = story.component as InternalComponentApi;
  transformComponent(component);

  if (story.subcomponents) {
    Object.values(story.subcomponents).forEach((subcomponent: InternalComponentApi) => {
      transformComponent(subcomponent);
    });
  }

  return { component, hasArgAsSlot, hasArgAsProp, argAsProp };
}

const AdditionalApiDocs: React.FC<{ children: React.ReactElement | React.ReactElement[] }> = ({ children }) => {
  const styles = useStyles();
  return (
    <div className={styles.additionalInfo}>
      <div className={styles.additionalInfoMessage}>
        <InfoFilled className={styles.additionalInfoIcon} />
        <div className={styles.infoIcon}>{children}</div>
      </div>
    </div>
  );
};
const RenderArgsTable = ({ hideArgsTable, story }: { story: PrimaryStory; hideArgsTable: boolean }) => {
  const { component, hasArgAsProp, hasArgAsSlot, argAsProp } = withSlotEnhancer(story);

  return hideArgsTable ? null : (
    <>
      {hasArgAsProp && (
        <AdditionalApiDocs>
          <p>
            <b>
              Native props are supported <span role="presentation">🙌</span>
              <br />
            </b>
            <span>
              All HTML attributes native to the
              {getNativeElementsList(argAsProp!)}, including all <code>aria-*</code> and <code>data-*</code> attributes,
              can be applied as native props on this component.
            </span>
          </p>
        </AdditionalApiDocs>
      )}
      {hasArgAsSlot && (
        <AdditionalApiDocs>
          <p>
            <b>
              Customizing components with slots <span role="presentation">🙌</span>
            </b>
            <br />
            <span>
              Slots in Fluent UI React components are designed to be modified or replaced, providing a flexible approach
              to customizing components. Each slot is exposed as a top-level prop and can be filled with primitive
              values, JSX/TSX, props objects, or render functions. This allows for more dynamic and reusable component
              structures, similar to slots in other frameworks.{' '}
              <Link href="/?path=/docs/concepts-developer-customizing-components-with-slots--docs">
                Customizing components with slots{' '}
              </Link>
            </span>
          </p>
        </AdditionalApiDocs>
      )}
      <ArgsTable of={component} />
    </>
  );
};
const RenderPrimaryStory = ({
  primaryStory,
  skipPrimaryStory,
}: {
  primaryStory: PrimaryStory;
  skipPrimaryStory: boolean;
}) => {
  const styles = useStyles();
  return skipPrimaryStory ? null : (
    <>
      <hr className={styles.divider} />
      <HeaderMdx as="h3" id={nameToHash(primaryStory.name)}>
        {primaryStory.name}
      </HeaderMdx>
      <Primary />
    </>
  );
};

export const FluentDocsPage = () => {
  const context = React.useContext(DocsContext);
  const stories = context.componentStories();

  const primaryStory = stories[0];
  const primaryStoryContext = context.getStoryContext(primaryStory);

  assertStoryMetaValues(primaryStory);

  const dir = primaryStoryContext.parameters?.dir ?? primaryStoryContext.globals?.[DIR_ID] ?? 'ltr';
  const selectedTheme = themes.find(theme => theme.id === primaryStoryContext.globals![THEME_ID]);

  const hideArgsTable = Boolean(primaryStoryContext.parameters?.docs?.hideArgsTable);
  const skipPrimaryStory = Boolean(primaryStoryContext.parameters?.docs?.skipPrimaryStory);

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
          <RenderPrimaryStory primaryStory={primaryStory} skipPrimaryStory={skipPrimaryStory} />
          <RenderArgsTable story={primaryStory} hideArgsTable={hideArgsTable} />
          <Stories />
        </div>
        <div className={styles.toc}>
          <Toc stories={stories} />
        </div>
      </div>
    </div>
  );
};

function assertStoryMetaValues(story: ReturnType<DocsContextProps['componentStories']>[number]) {
  if (story.component === null) {
    throw new Error(
      [
        '🚨 Invalid Story Meta declaration:',
        `- primaryStory.component of componentId:${story.componentId} is "null"`,
        '- to resolve this error, please update "component" property value in your story definition to reference a React Component or remove it if it is not needed.',
      ].join('\n'),
    );
  }
}
