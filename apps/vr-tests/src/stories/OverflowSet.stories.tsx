import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import { Fabric, OverflowSet, IOverflowSetItemProps } from '@fluentui/react';
import { IconButton } from '@fluentui/react/lib/Button';

const onRenderItem = (item: IOverflowSetItemProps) => item.name;
const onRenderOverflowButton = (overflowItems: any[]) => {
  return <IconButton menuProps={{ items: overflowItems! }} />;
};

storiesOf('OverflowSet', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .click('.ms-Button-flexContainer')
        .hover('.ms-Button-flexContainer')
        .snapshot('default')
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory(
    'Root',
    () => (
      <Fabric>
        <OverflowSet
          items={[
            { key: 'item1', name: 'Link 1' },
            { key: 'item2', name: 'Link 2' },
            { key: 'item3', name: 'Link 3' },
          ]}
          overflowItems={[
            { key: 'item4', name: 'Overflow Link 1' },
            { key: 'item5', name: 'Overflow Link 2' },
          ]}
          onRenderOverflowButton={onRenderOverflowButton}
          onRenderItem={onRenderItem}
        />
      </Fabric>
    ),
    { includeRtl: true },
  );

storiesOf('OverflowSet variant', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>,
  )
  .addStory('Vertical Direction', () => (
    <Fabric>
      <OverflowSet
        vertical
        items={[
          { key: 'item1', name: 'Link 1' },
          { key: 'item2', name: 'Link 2' },
          { key: 'item3', name: 'Link 3' },
        ]}
        overflowItems={[
          { key: 'item4', name: 'Overflow Link 1' },
          { key: 'item5', name: 'Overflow Link 2' },
        ]}
        onRenderOverflowButton={onRenderOverflowButton}
        onRenderItem={onRenderItem}
      />
    </Fabric>
  ));
