import * as React from 'react';
import { Tree, TreeItem, ShorthandValue, TreeItemProps, Flex, Button } from '@fluentui/react';

type Hack<P> = (itemProps: P) => HackRenderer<P>;
type HackRenderer<P> = (
  render: (itemProps: P, fn: (Component: React.ComponentType<P>, props: P) => JSX.Element) => JSX.Element
) => JSX.Element;

const customRenderer: Hack<TreeItemProps> = itemProps => render => render(itemProps, (_, _props) => <TreeItemProxy {..._props} />);

const debug = {
  changedProps: []
};

const areEqualShallow = (a: any, b: any) => {
  let areEqual = true;

  for (const key in a) {
    if (!(key in b) || a[key] !== b[key]) {
      debug.changedProps.push(key);
      areEqual = false;
    }
  }
  if (areEqual) {
    for (const key in b) {
      if (!(key in a) || a[key] !== b[key]) {
        debug.changedProps.push(key);
        areEqual = false;
      }
    }
  }
  return areEqual;
};

const TreeItemProxy: React.FunctionComponent<TreeItemProps> = React.memo(
  props => (
    <TreeItem {...props}>
      <div>
        Custom item {props.title}: {Math.random()}
      </div>
    </TreeItem>
  ),
  (prev, next) => {
    debug.changedProps = [];
    const areEqual = areEqualShallow(prev, next);
    document.getElementById('changed').innerHTML = `Changed props: ${JSON.stringify(debug.changedProps)}`;
    return areEqual;
  }
);

const Example: React.FunctionComponent<{}> = () => {
  const [state, setState] = React.useState(false);

  const items = React.useMemo<
    ShorthandValue<
      TreeItemProps & {
        kind?: undefined;
      }
    >[]
  >(() => {
    return [
      {
        id: 'header',
        title: 'Title',
        items: [
          customRenderer({
            id: '1',
            title: '1'
          }) as any
        ]
      }
    ];
  }, []);

  const forceUpdate = React.useCallback(() => {
    setState(!state);
  }, [setState, state]);

  return (
    <Flex column>
      <Tree items={items} defaultActiveItemIds={['header']} />
      <Button content={'Update'} onClick={forceUpdate} />
      <div id="changed" />
    </Flex>
  );
};

export default Example;
