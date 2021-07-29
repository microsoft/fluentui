import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { DescendantsProvider, useDescendants, useIndex } from './descendants';
import * as renderer from 'react-test-renderer';

describe('useDescendants', () => {
  test('should provide consistent index', () => {
    const { result: descendantsContext } = renderHook(() => {
      const [descendants, setDescendant] = useDescendants();
      return React.useMemo(() => ({ descendants, setDescendant }), [descendants, setDescendant]);
    });
    const wrapper: React.FC = ({ children }) => (
      <DescendantsProvider value={descendantsContext.current}>{children}</DescendantsProvider>
    );
    const { result: index0 } = renderHook(() => useIndex(), { wrapper });
    const { result: index1 } = renderHook(() => useIndex(), { wrapper });
    expect(index0.current).toBe(0);
    expect(index1.current).toBe(1);
  });
  test('should keep order when re-ordering items', () => {
    const ReverseTest: React.FC = () => {
      const [descendants, setDescendant] = useDescendants();
      const value = React.useMemo(() => ({ descendants, setDescendant }), [descendants, setDescendant]);
      const items = [<TestItem key="1" />, <TestItem key="2" />, <TestItem key="3" />];
      const [reverse, setReverse] = React.useState(false);
      return (
        <DescendantsProvider value={value}>
          {reverse ? items.reverse() : items}
          <button onClick={() => setReverse(true)}>reverse</button>
        </DescendantsProvider>
      );
    };
    const component = renderer.create(<ReverseTest />);
    const [i0, i1, i2] = component.root.findAllByType(TestItem);
    const button = component.root.findByType('button');
    expect(i0.children.toString()).toBe('0');
    expect(i1.children.toString()).toBe('1');
    expect(i2.children.toString()).toBe('2');
    renderer.act(() => {
      button.props.onClick();
    });
    expect(i0.children.toString()).toBe('2');
    expect(i1.children.toString()).toBe('1');
    expect(i2.children.toString()).toBe('0');
  });
  test('should keep order when adding items', () => {
    const AddTest: React.FC = () => {
      const [descendants, setDescendant] = useDescendants();
      const value = React.useMemo(() => ({ descendants, setDescendant }), [descendants, setDescendant]);
      const [items, setItems] = React.useState([<TestItem key="1" />, <TestItem key="2" />, <TestItem key="3" />]);
      return (
        <DescendantsProvider value={value}>
          {items}
          <button onClick={() => setItems([...items, <TestItem key="4" />])}>add</button>
        </DescendantsProvider>
      );
    };
    const component = renderer.create(<AddTest />);
    const [i0, i1, i2] = component.root.findAllByType(TestItem);
    const button = component.root.findByType('button');
    expect(i0.children.toString()).toBe('0');
    expect(i1.children.toString()).toBe('1');
    expect(i2.children.toString()).toBe('2');
    renderer.act(() => {
      button.props.onClick();
    });
    const [, , , i4] = component.root.findAllByType(TestItem);
    expect(i0.children.toString()).toBe('0');
    expect(i1.children.toString()).toBe('1');
    expect(i2.children.toString()).toBe('2');
    expect(i4.children.toString()).toBe('3');
  });
  test('should keep order when removing items', () => {
    const RemoveTest: React.FC = () => {
      const [descendants, setDescendant] = useDescendants();
      const value = React.useMemo(() => ({ descendants, setDescendant }), [descendants, setDescendant]);
      const [items, setItems] = React.useState([<TestItem key="1" />, <TestItem key="2" />, <TestItem key="3" />]);
      return (
        <DescendantsProvider value={value}>
          {items}
          <button onClick={() => setItems(items.slice(0, -1))}>remove</button>
        </DescendantsProvider>
      );
    };
    const component = renderer.create(<RemoveTest />);
    const button = component.root.findByType('button');
    expect(component.root.children.length).toBe(4);
    renderer.act(() => {
      button.props.onClick();
    });
    expect(component.root.children.length).toBe(3);
  });
});

const TestItem: React.FC = () => <>{useIndex()}</>;
