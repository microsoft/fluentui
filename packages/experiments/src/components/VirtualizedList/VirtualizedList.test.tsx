import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { VirtualizedList } from './VirtualizedList';
import { ScrollContainer } from '../../utilities/scrolling/ScrollContainer';

describe('VirtualizedList', () => {
  let component: renderer.ReactTestRenderer | undefined;

  afterEach(() => {
    if (component) {
      component.unmount();
      component = undefined;
    }
  });

  it('renders', () => {
    const items: { key: string }[] = [];
    for (let i = 0; i < 2000; i++) {
      items.push({ key: `Item ${i}` });
    }
    const renderItem = (item: { key: string }) => (
      <div key={item.key} style={{ height: 30 }}>
        {item.key}
      </div>
    );

    component = renderer.create(
      <ScrollContainer>
        <VirtualizedList items={items} itemHeight={30} onRenderItem={renderItem} />
      </ScrollContainer>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
