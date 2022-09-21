import * as _ from 'lodash';
import * as React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  Input,
  Tooltip,
  makeStyles,
  tokens,
  shorthands,
} from '@fluentui/react-components';
import { Select } from '@fluentui/react-components/unstable';
import { SearchRegular, DismissRegular } from '@fluentui/react-icons';
import { ComponentInfo } from '../componentInfo/types';
import { componentInfoContext } from '../componentInfo/componentInfoContext';
import { EXCLUDED_COMPONENTS, COMPONENT_GROUP } from '../config';
import { componentLibaries } from '../utils/componentLibraries';

const hoverBackgorund = { backgroundColor: tokens.colorBrandBackground2 };

const useStyles = makeStyles({
  search: { width: 'calc(100% - 4px)', marginLeft: '2px' },
  clearFilterIcon: { cursor: 'pointer', '&:hover': { color: tokens.colorNeutralForeground1 } },
  categoryItem: { '&:hover': { ...hoverBackgorund } },
  categoryItems: { display: 'flex', flexDirection: 'column', ...shorthands.margin(0) },
  componentItem: {
    ...shorthands.padding('0.5rem', '1rem'),
    ...shorthands.borderLeft('4px', 'solid', 'transparent'),
    cursor: 'grab',
    '&:hover': {
      borderLeftColor: tokens.colorBrandForeground1,
      ...hoverBackgorund,
    },
  },
  unsupportedHeader: {
    ...shorthands.borderTop('1px', 'solid', tokens.colorNeutralForeground1),
    ...shorthands.margin(0, 0, '0.5rem'),
    ...shorthands.padding('0.5rem', '0.5rem', 0),
  },
  unsupportedItem: {
    ...shorthands.padding('0.25rem', '0.5rem'),
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground3,
  },
});

export type ListProps = {
  onDragStart?: (componentInfo: ComponentInfo, e: MouseEvent) => void;
  style?: React.CSSProperties;
};

export const ComponentList: React.FunctionComponent<ListProps> = ({ onDragStart, style }) => {
  const [filter, setFilter] = React.useState<string>('');
  const [componentLibrary, setComponentLibrary] = React.useState(componentLibaries[0]);
  const onChangeComponentLibrary = (_, data) => {
    setComponentLibrary(componentLibaries.find(l => l.name === data.value));
  };

  const styles = useStyles();

  const filterRegexp = React.useMemo(() => new RegExp(filter, 'i'), [filter]);

  const handleMouseDown = React.useCallback(
    componentInfo => e => {
      if (onDragStart) {
        onDragStart(componentInfo, e);
      }
    },
    [onDragStart],
  );

  const handleFilterChange = React.useCallback((e, { value }) => {
    setFilter(value);
  }, []);

  const clearFilter = React.useCallback(() => {
    setFilter('');
  }, [setFilter]);

  const [supportedComponents, unsupportedComponents] = React.useMemo(
    () =>
      _.partition(_.values(componentInfoContext.byDisplayName), ({ displayName }) => {
        return displayName.match(filterRegexp) && !EXCLUDED_COMPONENTS.some(name => name === displayName);
      }),
    [filterRegexp],
  );

  const treeObj: Record<string, any> = React.useMemo(
    () =>
      Object.keys(COMPONENT_GROUP).reduce((acc, key) => {
        return {
          ...acc,
          [key]: {
            id: key,
            items: supportedComponents.filter(info => {
              const componentName = info.isChild ? info.parentDisplayName : info.displayName;
              const componentType = componentName.split('.')[1] || componentName;
              return componentName.startsWith(componentLibrary.prefix) && COMPONENT_GROUP[key].includes(componentType);
            }),
          },
        };
      }, {}),
    [supportedComponents, componentLibrary],
  );
  const treeItems = Object.values(treeObj).filter(treeItem => treeItem.items.length > 0);

  const unsupportedItem = displayName => (
    <span key={displayName} className={styles.unsupportedItem}>
      {displayName}
    </span>
  );

  return (
    <div
      role="complementary"
      aria-label="Available components"
      style={{
        ...style,
        userSelect: 'none',
      }}
    >
      <Select
        aria-label="Component library"
        appearance="underline"
        value={componentLibrary.name}
        onChange={onChangeComponentLibrary}
      >
        {componentLibaries.map(l => (
          <option key={l.name}>{l.name}</option>
        ))}
      </Select>
      <Input
        appearance="underline"
        contentAfter={
          filter.length ? (
            <DismissRegular className={styles.clearFilterIcon} onClick={clearFilter} />
          ) : (
            <SearchRegular />
          )
        }
        className={styles.search}
        placeholder="Search..."
        onChange={handleFilterChange}
        value={filter}
      />
      <Accordion multiple collapsible>
        {treeItems.map(c => (
          <AccordionItem key={c.id} value={c.id}>
            <AccordionHeader size="medium" className={styles.categoryItem}>
              {c.id}
            </AccordionHeader>
            <AccordionPanel className={styles.categoryItems}>
              {c.items.map(i => (
                <span key={i.displayName} className={styles.componentItem} onMouseDown={handleMouseDown(i)}>
                  {i.shortName || i.displayName}
                </span>
              ))}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
      <div className={styles.categoryItems}>
        <h3 className={styles.unsupportedHeader}>Unsupported items</h3>
        {unsupportedComponents
          .filter(info => info.displayName.match(filterRegexp))
          .map(info =>
            (info.docblock.description + info.docblock.tags).length > 0 ? (
              <Tooltip
                key={info.displayName}
                relationship="description"
                content={info.docblock.description + info.docblock.tags}
              >
                {unsupportedItem(info.shortName || info.displayName)}
              </Tooltip>
            ) : (
              unsupportedItem(info.displayName)
            ),
          )}
      </div>
    </div>
  );
};
