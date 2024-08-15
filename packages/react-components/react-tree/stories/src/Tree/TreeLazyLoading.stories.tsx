import * as React from 'react';
import {
  FlatTree,
  FlatTreeItem,
  TreeItemLayout,
  TreeItemValue,
  Spinner,
  makeStyles,
  TreeItemOpenChangeData,
  TreeItemOpenChangeEvent,
} from '@fluentui/react-components';
import { useQuery } from './utils/useQuery';
import { mockFetch } from './utils/mockFetch';

interface Entity {
  name: string;
  value: string;
}

type SubtreeProps = {
  value: TreeItemValue;
  onDataLoading?(): void;
  onDataLoaded?(): void;
};

const useStyles = makeStyles({
  screenReadersOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    margin: '-1',
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    whiteSpace: 'nowrap',
  },
});

export const LazyLoading = () => {
  const [ariaMessage, setAriaMessage] = React.useState('');
  const styles = useStyles();
  return (
    <>
      <FlatTree aria-label="Lazy Loading">
        <Subtree
          value="People"
          onDataLoaded={React.useCallback(() => setAriaMessage(`people items loaded`), [])}
          onDataLoading={React.useCallback(() => setAriaMessage(`loading people items...`), [])}
        />
        <Subtree
          value="Planet"
          onDataLoaded={React.useCallback(() => setAriaMessage(`planet items loaded`), [])}
          onDataLoading={React.useCallback(() => setAriaMessage(`loading planet items...`), [])}
        />
        <Subtree
          value="Starship"
          onDataLoaded={React.useCallback(() => setAriaMessage(`starship items loaded`), [])}
          onDataLoading={React.useCallback(() => setAriaMessage(`loading starship items...`), [])}
        />
      </FlatTree>
      <div aria-live="polite" aria-atomic="true" className={styles.screenReadersOnly}>
        {ariaMessage}
      </div>
    </>
  );
};

const Subtree: React.FC<SubtreeProps> = ({ onDataLoaded, onDataLoading, value }) => {
  const [open, setOpen] = React.useState(false);
  // useQuery here is just a helper to simulate async data fetching
  // you can use any other async data fetching library like react-query, swr, etc.
  const { query, value: items, state } = useQuery<Entity[]>([]);

  // we need to focus the first item when the subtree is opened
  const firstItemRef = React.useRef<HTMLDivElement>(null);

  const handleOpenChange = React.useCallback(
    (e: TreeItemOpenChangeEvent, data: TreeItemOpenChangeData) => {
      setOpen(data.open);
    },
    [setOpen],
  );

  React.useEffect(() => {
    if (open && state === 'idle') {
      onDataLoading?.();
      query(async () => {
        // mockFetch is just a helper to simulate an API endpoint.
        // you probably will be using some custom API endpoint here.
        const json = await mockFetch(value.toString());
        return json.results.map<Entity>(entity => ({ value: `${value}/${entity.name}`, name: entity.name }));
      });
    }
  }, [open, onDataLoading, query, state, value]);

  React.useEffect(() => {
    if (open && state === 'loaded') {
      onDataLoaded?.();
      firstItemRef.current?.focus();
    }
  }, [open, state, onDataLoaded]);

  return (
    <>
      <FlatTreeItem
        value={value}
        aria-level={1}
        aria-setsize={3}
        aria-posinset={1}
        itemType="branch"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <TreeItemLayout expandIcon={state === 'loading' ? <Spinner size="tiny" /> : undefined}>
          {value.toString()}
        </TreeItemLayout>
      </FlatTreeItem>
      {open &&
        items.map((item, index) => (
          <FlatTreeItem
            key={item.value}
            ref={index === 0 ? firstItemRef : null}
            parentValue={value}
            value={item.value}
            aria-level={2}
            aria-setsize={items.length}
            aria-posinset={index + 1}
            itemType="leaf"
          >
            <TreeItemLayout>{item.name}</TreeItemLayout>
          </FlatTreeItem>
        ))}
    </>
  );
};

LazyLoading.parameters = {
  docs: {
    description: {
      story: `
This example shows lazy loading in a flat tree, where data is loaded on-demand to optimize rendering time and performance. Items are dynamically loaded when necessary.
      `,
    },
  },
};
