import { render } from '@testing-library/react';
import * as React from 'react';

import { PresenceGroupChildContext, PresenceGroupChildContextValue } from '../contexts/PresenceGroupChildContext';
import { PresenceGroup } from './PresenceGroup';

const TestComponent: React.FC<{
  id: string;
  onRender: (data: { id: string; appear: boolean; visible: boolean }) => void;
}> = props => {
  const { id, onRender } = props;
  const context = React.useContext(PresenceGroupChildContext) as PresenceGroupChildContextValue;

  React.useEffect(() => {
    onRender({
      id,
      appear: context.appear,
      visible: context.visible,
    });
  });

  return <div>{id}</div>;
};

describe('PresenceGroup', () => {
  it('renders items an provides context to them', () => {
    const onItemRender = jest.fn();

    render(
      <PresenceGroup>
        <TestComponent id="1" onRender={onItemRender} />
        <TestComponent id="2" onRender={onItemRender} />
      </PresenceGroup>,
    );

    expect(onItemRender).toHaveBeenCalledTimes(2);
    expect(onItemRender).toHaveBeenNthCalledWith(1, { id: '1', appear: false, visible: true });
    expect(onItemRender).toHaveBeenNthCalledWith(2, { id: '2', appear: false, visible: true });
  });

  it('updates context when items are added or removed', () => {
    const onItemRender = jest.fn();

    const { rerender } = render(
      <PresenceGroup>
        <TestComponent key="1" id="1" onRender={onItemRender} />
        <TestComponent key="2" id="2" onRender={onItemRender} />
      </PresenceGroup>,
    );

    expect(onItemRender).toHaveBeenCalledTimes(2);
    onItemRender.mockClear();

    rerender(
      <PresenceGroup>
        <TestComponent key="1" id="1" onRender={onItemRender} />
        <TestComponent key="3" id="3" onRender={onItemRender} />
      </PresenceGroup>,
    );

    expect(onItemRender).toHaveBeenCalledTimes(3);
    expect(onItemRender).toHaveBeenNthCalledWith(1, { id: '1', appear: false, visible: true });
    expect(onItemRender).toHaveBeenNthCalledWith(2, { id: '3', appear: true, visible: true });
    expect(onItemRender).toHaveBeenNthCalledWith(3, { id: '2', appear: false, visible: false });
  });
});
