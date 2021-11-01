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

import { Toc, idToHash } from './Toc.stories';

const CONTAINER_WIDTH = '900px';
const TOC_WIDTH = '300px';

export const FluentDocsPage = () => {
  const context = React.useContext(DocsContext);
  const stories = context.storyStore.getStoriesForKind(context.kind);
  const primaryStory = stories[0];

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

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row-reverse',
          justifyContent: 'flex-end',
          gap: '16px',
        }}
      >
        <div style={{ maxWidth: TOC_WIDTH }}>
          <Toc stories={stories} />
        </div>
        <div style={{ width: CONTAINER_WIDTH }}>
          <Subtitle />
          <Description />
          <HeaderMdx as="h3" id={idToHash(primaryStory.id)}>
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
