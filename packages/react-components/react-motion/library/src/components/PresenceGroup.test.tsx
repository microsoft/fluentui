import { render } from '@testing-library/react';
import * as React from 'react';

import { PresenceGroupChildContext, PresenceGroupChildContextValue } from '../contexts/PresenceGroupChildContext';
import { PresenceGroup } from './PresenceGroup';

const TestComponent: React.FC<{
  id: string;
  onRender: (data: { id: string; appear: boolean; visible: boolean }) => void;
}> = props => {
  const { id, onRender } = props;
  const { appear, visible, onExit } = React.useContext(PresenceGroupChildContext) as PresenceGroupChildContextValue;

  React.useEffect(() => {
    onRender({ id, appear, visible });
  });

  React.useEffect(() => {
    if (!visible) {
      onExit();
    }
  }, [onExit, visible]);

  return <div>{id}</div>;
};

describe('PresenceGroup', () => {
  it('renders items an provides context to them', () => {
    const onItemRender = jest.fn();

    const { queryByText } = render(
      <PresenceGroup>
        <TestComponent id="1" onRender={onItemRender} />
        <TestComponent id="2" onRender={onItemRender} />
      </PresenceGroup>,
    );

    expect(onItemRender).toHaveBeenCalledTimes(2);
    expect(onItemRender).toHaveBeenNthCalledWith(1, { id: '1', appear: false, visible: true });
    expect(onItemRender).toHaveBeenNthCalledWith(2, { id: '2', appear: false, visible: true });

    expect(queryByText('1')).toBeInTheDocument();
    expect(queryByText('2')).toBeInTheDocument();
  });

  it('updates context when items are added or removed', () => {
    const onItemRender = jest.fn();

    const { queryByText, rerender } = render(
      <PresenceGroup>
        <TestComponent key="1" id="1" onRender={onItemRender} />
        <TestComponent key="2" id="2" onRender={onItemRender} />
      </PresenceGroup>,
    );

    expect(onItemRender).toHaveBeenCalledTimes(2);
    expect(queryByText('1')).toBeInTheDocument();
    expect(queryByText('2')).toBeInTheDocument();

    // ---

    onItemRender.mockClear();
    rerender(
      <PresenceGroup>
        <TestComponent key="1" id="1" onRender={onItemRender} />
        <TestComponent key="3" id="3" onRender={onItemRender} />
      </PresenceGroup>,
    );

    expect(onItemRender).toHaveBeenNthCalledWith(1, { id: '1', appear: false, visible: true });
    expect(onItemRender).toHaveBeenNthCalledWith(2, { id: '3', appear: true, visible: true });
    expect(onItemRender).toHaveBeenNthCalledWith(3, { id: '2', appear: false, visible: false });

    expect(queryByText('1')).toBeInTheDocument();
    expect(queryByText('2')).not.toBeInTheDocument();
    expect(queryByText('3')).toBeInTheDocument();
  });
});
