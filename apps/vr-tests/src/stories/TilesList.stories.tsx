import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecoratorFixedWidth } from '../utilities/index';
import {
  ITilesGridItem,
  ITilesGridSegment,
  ITileSize,
  TilesGridMode,
  TilesList,
} from '@fluentui/react-experiments';

export interface IBasicItem {
  color: string;
  key: string;
}

const ITEMS: IBasicItem[] = [];

for (let i = 0; i < 27; i++) {
  ITEMS.push({
    color: ['red', 'blue', 'green', 'yellow', 'orange', 'brown', 'purple', 'gray'][i % 8],
    key: `item-${i}`,
  });
}

export interface ITilesListBasicExampleState {
  items: ITilesGridItem<IBasicItem>[];
}

export class TilesListBasicExample extends React.Component<{}, ITilesListBasicExampleState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      items: ITEMS.map((item: IBasicItem): ITilesGridItem<IBasicItem> => {
        return {
          content: item,
          desiredSize: { width: 100, height: 100 },
          key: item.key,
          onRender: renderItem,
        };
      }),
    };
  }

  public render(): JSX.Element {
    const gridSegment: ITilesGridSegment<IBasicItem> = {
      items: this.state.items,
      key: 'grid',
      mode: TilesGridMode.fill,
      minRowHeight: 100,
      spacing: 10,
    };

    return <TilesList items={[gridSegment]} />;
  }
}

function renderItem(item: IBasicItem, finalSize?: ITileSize): JSX.Element {
  return (
    <div
      style={{
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: '0',
        left: '0',
        bottom: '0',
        right: '0',
        backgroundColor: item.color,
      }}
    >
      <span>{finalSize ? `${finalSize.width.toFixed(1)}x${finalSize.height.toFixed(1)}` : ''}</span>
    </div>
  );
}

storiesOf('TilesList', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
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
  .addStory('Basic', () => <TilesListBasicExample />, { includeRtl: true });
