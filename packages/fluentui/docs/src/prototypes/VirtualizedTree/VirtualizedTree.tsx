import * as React from 'react';
import { Tree, TreeItemProps } from '@fluentui/react-northstar';
import { CellMeasurer, CellMeasurerCache, List as ReactVirtualizedList } from 'react-virtualized';
import getItems from './itemsGenerator';

interface TreeVirtualizerProps {
  renderedItems: React.ReactElement[];
}

function TreeVirtualizer(props: TreeVirtualizerProps) {
  const cache = new CellMeasurerCache({
    defaultHeight: 20,
    fixedWidth: true,
  });
  const [scrollToIndex, setScrollToIndex] = React.useState();

  const handleFocusParent = (e: React.SyntheticEvent, treeItemProps: TreeItemProps, index: number) => {
    const { renderedItems } = props;
    const { parent } = treeItemProps;

    if (!parent) {
      return;
    }

    const indexOfParent = renderedItems.findIndex(
      (renderedItem: React.ReactElement) => renderedItem.props['id'] === parent,
    );

    // If parent already visible, then it should be focused by Tree.
    if (renderedItems[indexOfParent].props['contentRef'].current) {
      return;
    }

    setScrollToIndex(indexOfParent);
  };

  const rowRenderer = ({ index, isScrolling, key, parent, style }) => {
    const { renderedItems } = props;

    return (
      <CellMeasurer cache={cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
        {React.cloneElement(renderedItems[index], {
          style,
          onFocusParent: (e, treeItemProps: TreeItemProps) => {
            handleFocusParent(e, treeItemProps, index);
          },
        })}
      </CellMeasurer>
    );
  };

  return (
    <ReactVirtualizedList
      deferredMeasurementCache={cache}
      rowHeight={cache.rowHeight}
      rowRenderer={rowRenderer}
      estimatedRowSize={20}
      height={300}
      rowCount={props.renderedItems.length}
      width={600}
      scrollToIndex={scrollToIndex}
      onRowsRendered={() => {
        if (scrollToIndex !== undefined) {
          props.renderedItems[scrollToIndex].props.contentRef.current.focus();
          // Once scrolling is complete we remove the index to avoid scrolling to the same
          // item at every render.
          setScrollToIndex(undefined);
        }
      }}
    />
  );
}

const items = getItems();

const VirtualizedTreePrototype = () => (
  <Tree items={items} renderedItems={renderedItems => <TreeVirtualizer renderedItems={renderedItems} />} />
);

export default VirtualizedTreePrototype;
