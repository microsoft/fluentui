import {
  createPresenceComponent,
  makeStyles,
  Button,
  Persona,
  tokens,
  motionTokens,
  PresenceGroup,
  Tree,
  TreeItem,
  TreeItemLayout,
  Input,
  Field,
  RadioGroup,
  Radio,
  TreeItemProps,
  Divider,
} from '@fluentui/react-components';
import { mapItemsWithIndexes } from '@fluentui/react-motion';
import * as React from 'react';
import { faker } from '@faker-js/faker';
import { nanoid } from 'nanoid';
import { usePrevious } from '@fluentui/react-utilities';

import './style.css';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
  },
  card: {
    display: 'flex',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',

    width: '400px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
});

// -----

type Item = {
  firstName: string;
  lastName: string;
  key: string;
};

function createItem(): Item {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    key: nanoid(),
  };
}

// -----

const ITEM_HEIGHT = 32;

function ItemsToolbox({ setItems }: { setItems: React.Dispatch<React.SetStateAction<Item[]>> }) {
  const classes = useClasses();

  const [count, setCount] = React.useState(5);
  const [position, setPosition] = React.useState<'start' | 'middle' | 'end'>('end');

  return (
    <div className={classes.controls}>
      <Field label="Items to add">
        <Input value={count.toString()} onChange={e => setCount(+e.target.value)} />
      </Field>

      <Field label="Position">
        <RadioGroup
          layout="horizontal-stacked"
          onChange={(e, data) => {
            setPosition(data.value as 'start' | 'middle' | 'end');
          }}
          value={position}
        >
          <Radio value="start" label="Start" />
          <Radio value="middle" label="Middle" />
          <Radio value="end" label="End" />
        </RadioGroup>
      </Field>

      <Button
        onClick={() => {
          const itemsToAdd = new Array(count).fill(null).map(() => createItem());

          setItems(prev => {
            const newItems = [...prev];

            if (position === 'start') {
              newItems.unshift(...itemsToAdd);
            } else if (position === 'middle') {
              newItems.splice(Math.floor(newItems.length / 2), 0, ...itemsToAdd);
            } else {
              newItems.push(...itemsToAdd);
            }

            return newItems;
          });
        }}
      >
        Add
      </Button>

      <Divider style={{ marginTop: 5, marginBottom: 5 }} />

      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          onClick={() => {
            setItems(prev => {
              return prev.slice().sort((a, b) => {
                return a.firstName.localeCompare(b.firstName);
              });
            });
          }}
        >
          Sort by "firstName"
        </Button>
        <Button
          onClick={() => {
            setItems(prev => {
              return prev.slice().sort((a, b) => {
                return a.lastName.localeCompare(b.lastName);
              });
            });
          }}
        >
          Sort by "lastName"
        </Button>
      </div>
    </div>
  );
}

function MappedItem(props: Omit<Item, 'key'> & { index?: number; prevIndex?: number }) {
  const { prevIndex, index, firstName, lastName } = props;
  const ref = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const el = ref.current;

    if (el) {
      el.style.setProperty('--prev-pos', `${(prevIndex ?? -1) * ITEM_HEIGHT}px`);
      el.style.setProperty('--pos', `${(index ?? -1) * ITEM_HEIGHT}px`);
    }
  }, [prevIndex, index]);

  return (
    <TreeItem
      className="tree-item"
      itemType="leaf"
      style={{
        ...({
          '--height': `${ITEM_HEIGHT}px`,
          backgroundColor: tokens.colorSubtleBackgroundHover,
        } as React.CSSProperties),
      }}
      ref={ref}
    >
      <TreeItemLayout>{firstName + ' ' + lastName}</TreeItemLayout>
    </TreeItem>
  );
}

export const TreeExample = () => {
  const classes = useClasses();

  const [items, setItems] = React.useState<Item[]>(() => new Array(10).fill(null).map(() => createItem()));
  const previousItems = usePrevious<Item[]>(items);

  const mappedItems = React.useMemo(() => mapItemsWithIndexes(previousItems ?? [], items), [items, previousItems]);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <Tree defaultOpenItems={['default-subtree-1']} aria-label="Default" style={{ flex: 1 }}>
          <TreeItem itemType="branch" value="default-subtree-1">
            <TreeItemLayout>level 1, item 1</TreeItemLayout>
            <Tree
              className="tree"
              collapseMotion={{
                children: (_, props) => {
                  if (props.visible) {
                    return React.cloneElement(props.children, {
                      style: {
                        height: ITEM_HEIGHT * mappedItems.length,
                        transition: '1s height, 1s opacity',
                        contain: 'content',
                        opacity: 1,
                      },
                    });
                  }

                  return null;
                },
              }}
              style={{ position: 'relative' }}
            >
              {mappedItems.map(item => (
                <MappedItem {...item} key={item.key} />
              ))}
            </Tree>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 1, item 3</TreeItemLayout>
          </TreeItem>
        </Tree>
      </div>

      <div>
        <ItemsToolbox setItems={setItems} />
      </div>
    </div>
  );
};
