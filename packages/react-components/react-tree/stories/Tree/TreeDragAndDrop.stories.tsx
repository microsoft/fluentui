import * as React from 'react';
import {
  FlatTree,
  FlatTreeItem,
  TreeItemLayout,
  useHeadlessFlatTree_unstable,
  HeadlessFlatTreeItemProps,
  FlatTreeItemProps,
} from '@fluentui/react-components';

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type FlatItem = HeadlessFlatTreeItemProps & { layout: string };

const flatTreeItems: FlatItem[] = [
  { value: '1', layout: 'Parent item' },
  { value: '1-1', parentValue: '1', layout: 'Sortable item 1' },
  { value: '1-2', parentValue: '1', layout: 'Sortable item 2' },
  { value: '1-3', parentValue: '1', layout: 'Sortable item 3' },
  { value: '1-4', parentValue: '1', layout: 'Sortable item 4' },
  { value: '1-5', parentValue: '1', layout: 'Sortable item 5' },
  { value: '1-6', parentValue: '1', layout: 'Sortable item 6' },
  { value: '1-7', parentValue: '1', layout: 'Sortable item 7' },
  { value: '1-8', parentValue: '1', layout: 'Sortable item 8' },
];

const sortItems = (array: FlatItem[], from: number, to: number) => {
  const newArray = array.slice();
  const startIndex = from < 0 ? array.length + from : from;
  const item = newArray.splice(startIndex, 1)[0];
  const endIndex = to < 0 ? array.length + to : to;
  newArray.splice(endIndex, 0, item);
  return newArray;
};

const SortableTreeItem = ({ children, value, ...rest }: FlatTreeItemProps) => {
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id: value as UniqueIdentifier,
  });
  const style = { transform: CSS.Transform.toString(transform), transition, zIndex: isDragging ? 1 : 0 };

  return (
    <FlatTreeItem ref={setNodeRef} value={value} style={style} {...attributes} {...listeners} {...rest}>
      {children}
    </FlatTreeItem>
  );
};

export const DragAndDrop = () => {
  const [items, setItems] = React.useState(flatTreeItems);
  const virtualTree = useHeadlessFlatTree_unstable(items, {
    defaultOpenItems: ['1'],
  });

  const handleDragEnd = React.useCallback(event => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems(prevItems => {
        const oldIndex = prevItems.findIndex(item => item.value === active.id);
        const newIndex = prevItems.findIndex(item => item.value === over.id);
        return sortItems(prevItems, oldIndex, newIndex);
      });
    }
  }, []);

  const sortableItems = items.filter(item => item.parentValue).map(item => item.value);
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={sortableItems} strategy={verticalListSortingStrategy}>
        <FlatTree aria-label="Drag And Drop" {...virtualTree.getTreeProps()}>
          {Array.from(virtualTree.items(), item => {
            const { layout, ...itemProps } = item.getTreeItemProps();
            return item.itemType === 'leaf' ? (
              <SortableTreeItem key={item.value} {...itemProps}>
                <TreeItemLayout>{layout}</TreeItemLayout>
              </SortableTreeItem>
            ) : (
              <FlatTreeItem {...itemProps} key={item.value}>
                <TreeItemLayout>{layout}</TreeItemLayout>
              </FlatTreeItem>
            );
          })}
        </FlatTree>
      </SortableContext>
    </DndContext>
  );
};

DragAndDrop.parameters = {
  docs: {
    description: {
      story: `The tree component **does not** offer built-in drag-and-drop functionality. Yet, it's been designed with adaptability in mind, allowing for easy integration with third-party libraries to fulfill this need.

In this example, the tree component is integrated with \`@dnd-kit\` to enable drag-and-drop behavior within the tree. A few key steps are involved to achieve this:

**DndContext** and **SortableContext** from \`@dnd-kit\` set up the necessary environment for drag-and-drop throughout the tree. Following that, **SortableTreeItem** is a component that wraps \`TreeItem\`, leveraging the **useSortable** hook to add drag-and-drop capabilities. Lastly, the **handleDragEnd** function ensures items are rearranged correctly after dragging.

By adopting this approach, users can easily drag and drop tree items, rearranging them as desired. The \`dnd-kit\` also supports virtualization. For an in-depth look and further customization options, check the [dnd-kit's documentation](https://dndkit.com/).`,
    },
  },
};
