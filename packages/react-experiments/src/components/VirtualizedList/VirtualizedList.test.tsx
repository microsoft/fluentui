import * as React from 'react';
import { render } from '@testing-library/react';
import { VirtualizedList } from './VirtualizedList';
import { ScrollContainer } from '../../utilities/scrolling/ScrollContainer';

describe('VirtualizedList', () => {
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

    const { container } = render(
      <ScrollContainer>
        <VirtualizedList items={items} itemHeight={30} onRenderItem={renderItem} />
      </ScrollContainer>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
