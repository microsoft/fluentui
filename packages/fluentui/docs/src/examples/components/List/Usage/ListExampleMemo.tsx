import { useLogKnob } from '@fluentui/docs-components';
import { List, ListItem } from '@fluentui/react-northstar';
import * as React from 'react';

type MemoItemProps = {
  children?: string;
  index: number;
  onRender: (index: number) => void;
};

const RenderLogger: React.FC<MemoItemProps & { 'data-id': number }> = props => {
  const { 'data-id': id, onRender, ...rest } = props;
  onRender(id);

  return <ul {...rest} />;
};

const MemoItem = React.memo<MemoItemProps>(props => {
  const { children, index, onRender } = props;

  return <ListItem as={RenderLogger} content={children} data-id={index} index={index} onRender={onRender} />;
});

const ListExampleSelectable = () => {
  // (!) `handleRender` and `RenderLogger` are used only for logging purposes and are not required
  //     for an actual implementation
  const handleRender = useLogKnob(
    'MemoItem:render',
    undefined,
    (id: string, index: number) => `${new Date().toLocaleTimeString()}: ${id}({ id: ${index} })`,
  );

  return (
    <List selectable>
      <MemoItem index={0} onRender={handleRender}>
        This is an item 0
      </MemoItem>
      <MemoItem index={1} onRender={handleRender}>
        This is an item 1
      </MemoItem>
      <MemoItem index={2} onRender={handleRender}>
        This is an item 2
      </MemoItem>
      <MemoItem index={3} onRender={handleRender}>
        This is an item 3
      </MemoItem>
    </List>
  );
};

export default ListExampleSelectable;
