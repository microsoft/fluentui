import * as React from 'react';
import { VirtualizedList } from '../VirtualizedList';
import { ScrollContainer } from '../../../utilities/scrolling/ScrollContainer';

interface IItem {
  key: string;
}

const items: IItem[] = [];

type ExampleList = new () => VirtualizedList<IItem>;
const ExampleList: ExampleList = VirtualizedList as any;

export class VirtualizedListBasicExample extends React.Component {

  constructor() {
    super();

    // Populate with items for demos.
    if (items.length === 0) {
      for (let i = 0; i < 2000; i++) {
        items.push({
          key: `Item ${i}`
        });
      }
    }
  }

  public render() {
    return (
      <div>
        <ScrollContainer>
          <ExampleList
            items={ items }
            itemHeight={ 30 }
            onRenderItem={ (item, itemIndex) => (
              <div key={ item.key } style={ { height: 30 } }>
                { item.key }
              </div>
            ) }
          />
        </ScrollContainer>
      </div>
    );
  }
}
