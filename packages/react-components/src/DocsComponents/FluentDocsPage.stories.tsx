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

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    ...shorthands.gap('16px'),
  },
  toc: {
    flexBasis: '200px',
    flexShrink: 0,
  },
  container: {
    flexBasis: '700px',
    flexGrow: 1,
  },
});

export const FluentDocsPage = () => {
  const context = React.useContext(DocsContext);
  const stories = context.storyStore.getStoriesForKind(context.kind);
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
    <>
      <Title />

      <div className={styles.wrapper}>
        <div className={styles.toc}>
          <Toc stories={stories} />
        </div>
        <div className={styles.container}>
          <Subtitle />
          <Description />
          <HeaderMdx as="h3" id={nameToHash(primaryStory.name)}>
            {primaryStory.name}
          </HeaderMdx>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </div>
      </div>
    </>
  );
};
