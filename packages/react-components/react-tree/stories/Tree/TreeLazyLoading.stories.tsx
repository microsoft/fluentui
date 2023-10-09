import * as React from 'react';
import {
  FlatTree,
  FlatTreeItem,
  TreeItemLayout,
  TreeItemValue,
  TreeOpenChangeData,
  TreeOpenChangeEvent,
  Spinner,
  shorthands,
  makeStyles,
} from '@fluentui/react-components';

interface Result {
  results: { name: string }[];
}

interface Entity {
  name: string;
  value: string;
  itemType: 'branch' | 'leaf';
}

interface SubtreeProps {
  openItems: Set<TreeItemValue>;
  setAriaMessage: (message: string) => void;
}

const useStyles = makeStyles({
  screenReadersOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    ...shorthands.margin('-1'),
    ...shorthands.overflow('hidden'),
    clip: 'rect(0,0,0,0)',
    whiteSpace: 'nowrap',
  },
});

export const LazyLoading = () => {
  const [openItems, setOpenItems] = React.useState<Set<TreeItemValue>>(() => new Set());
  const [ariaMessage, setAriaMessage] = React.useState('');
  const styles = useStyles();

  const handleOpenChange = React.useCallback((_: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
    setOpenItems(data.openItems);
  }, []);

  return (
    <>
      <FlatTree openItems={openItems} onOpenChange={handleOpenChange} aria-label="Lazy Loading">
        <PeopleSubtree openItems={openItems} setAriaMessage={setAriaMessage} />
        <PlanetsSubtree openItems={openItems} setAriaMessage={setAriaMessage} />
        <StarshipsSubtree openItems={openItems} setAriaMessage={setAriaMessage} />
      </FlatTree>
      <div aria-live="polite" aria-atomic="true" className={styles.screenReadersOnly}>
        {ariaMessage}
      </div>
    </>
  );
};

const PeopleSubtree: React.FC<SubtreeProps> = ({ openItems, setAriaMessage }) => {
  const peopleTree = useQuery<Entity[]>([]);
  const { isLoaded, isLoading } = peopleTree;
  const firstItemRef = React.useRef<HTMLDivElement>(null);

  const handleDataFetch = React.useCallback(
    async (type: string) => {
      peopleTree.query(async () => {
        const json = await mockFetch(type);
        return json.results.map<Entity>(entity => ({
          value: `${type}/${entity.name}`,
          name: entity.name,
          itemType: 'leaf',
        }));
      });
    },
    [peopleTree],
  );

  React.useEffect(() => {
    if (openItems.has('people') && !isLoaded && !isLoading) {
      setAriaMessage(`loading people items...`);
      handleDataFetch('people');
    }

    if (isLoaded) {
      setAriaMessage(`people items loaded`);
      firstItemRef.current?.focus();
    }
  }, [handleDataFetch, isLoaded, isLoading, openItems, setAriaMessage]);

  return (
    <>
      <FlatTreeItem value="people" aria-level={1} aria-setsize={3} aria-posinset={1} itemType="branch">
        <TreeItemLayout expandIcon={peopleTree.isLoading ? <Spinner size="tiny" /> : undefined}>People</TreeItemLayout>
      </FlatTreeItem>
      {openItems.has('people') &&
        peopleTree.value.map((person, index) => (
          <FlatTreeItem
            key={person.value}
            ref={index === 0 ? firstItemRef : null}
            parentValue="people"
            value={person.value}
            aria-level={2}
            aria-setsize={peopleTree.value.length}
            aria-posinset={index + 1}
            itemType="leaf"
          >
            <TreeItemLayout>{person.name}</TreeItemLayout>
          </FlatTreeItem>
        ))}
    </>
  );
};

const PlanetsSubtree: React.FC<SubtreeProps> = ({ openItems, setAriaMessage }) => {
  const planetsTree = useQuery<Entity[]>([]);
  const { isLoaded, isLoading } = planetsTree;
  const firstItemRef = React.useRef<HTMLDivElement>(null);

  const handleDataFetch = React.useCallback(
    async (type: string) => {
      planetsTree.query(async () => {
        const json = await mockFetch(type);
        return json.results.map<Entity>(entity => ({
          value: `${type}/${entity.name}`,
          name: entity.name,
          itemType: 'leaf',
        }));
      });
    },
    [planetsTree],
  );

  React.useEffect(() => {
    if (openItems.has('planets') && !isLoaded && !isLoading) {
      setAriaMessage(`loading planets items...`);
      handleDataFetch('planets');
    }

    if (isLoaded) {
      setAriaMessage(`planets items loaded`);
      firstItemRef.current?.focus();
    }
  }, [handleDataFetch, isLoaded, isLoading, openItems, setAriaMessage]);

  return (
    <>
      <FlatTreeItem value="planets" aria-level={1} aria-setsize={3} aria-posinset={2} itemType="branch">
        <TreeItemLayout expandIcon={planetsTree.isLoading ? <Spinner size="tiny" /> : undefined}>
          Planets
        </TreeItemLayout>
      </FlatTreeItem>
      {openItems.has('planets') &&
        planetsTree.value.map((planet, index) => (
          <FlatTreeItem
            key={planet.value}
            ref={index === 0 ? firstItemRef : null}
            parentValue="planets"
            value={planet.value}
            aria-level={2}
            aria-setsize={planetsTree.value.length}
            aria-posinset={index + 1}
            itemType="leaf"
          >
            <TreeItemLayout>{planet.name}</TreeItemLayout>
          </FlatTreeItem>
        ))}
    </>
  );
};

const StarshipsSubtree: React.FC<SubtreeProps> = ({ openItems, setAriaMessage }) => {
  const starshipsTree = useQuery<Entity[]>([]);
  const { isLoaded, isLoading } = starshipsTree;
  const firstItemRef = React.useRef<HTMLDivElement>(null);

  const handleDataFetch = React.useCallback(
    async (type: string) => {
      starshipsTree.query(async () => {
        const json = await mockFetch(type);
        return json.results.map<Entity>(entity => ({
          value: `${type}/${entity.name}`,
          name: entity.name,
          itemType: 'leaf',
        }));
      });
    },
    [starshipsTree],
  );

  React.useEffect(() => {
    if (openItems.has('starships') && !isLoaded && !isLoading) {
      setAriaMessage(`loading starships items...`);
      handleDataFetch('starships');
    }

    if (isLoaded) {
      setAriaMessage(`starships items loaded`);
      firstItemRef.current?.focus();
    }
  }, [handleDataFetch, isLoaded, isLoading, openItems, setAriaMessage]);

  return (
    <>
      <FlatTreeItem value="starships" aria-level={1} aria-setsize={3} aria-posinset={3} itemType="branch">
        <TreeItemLayout expandIcon={starshipsTree.isLoading ? <Spinner size="tiny" /> : undefined}>
          Starships
        </TreeItemLayout>
      </FlatTreeItem>
      {openItems.has('starships') &&
        starshipsTree.value.map((starship, index) => (
          <FlatTreeItem
            key={starship.value}
            ref={index === 0 ? firstItemRef : null}
            parentValue="starships"
            value={starship.value}
            aria-level={2}
            aria-setsize={starshipsTree.value.length}
            aria-posinset={index + 1}
            itemType="leaf"
          >
            <TreeItemLayout>{starship.name}</TreeItemLayout>
          </FlatTreeItem>
        ))}
    </>
  );
};

/**
 * This function is just for the sake of the example,
 * a library for fetching data (like react-query) might be a better option
 */
function useQuery<Value>(initialValue: Value) {
  const [queryResult, setQueryResult] = React.useState({ value: initialValue, isLoading: false, isLoaded: false });
  const query = (fn: () => Promise<Value> | Value) => {
    setQueryResult(curr => ({ ...curr, isLoading: true }));
    Promise.resolve(fn()).then(nextValue => {
      setQueryResult({ value: nextValue, isLoaded: true, isLoading: false });
    });
  };
  return { ...queryResult, query } as const;
}

const mockFetch = (type: string) => {
  return new Promise<Result>(resolve => {
    setTimeout(() => {
      const mockData: Result = {
        results: Array.from({ length: 10 }, (_, index) => ({
          name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${index + 1}`,
        })),
      };
      resolve(mockData);
    }, 1000);
  });
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
