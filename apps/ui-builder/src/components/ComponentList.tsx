import * as _ from 'lodash';
import * as React from 'react';
import { Box, Input, Tree, Tooltip } from '@fluentui/react-northstar';
import { SearchIcon, TriangleDownIcon, TriangleEndIcon } from '@fluentui/react-icons-northstar';
import { Select } from '@fluentui/react-components/unstable';
import { ComponentInfo } from '../componentInfo/types';
import { componentInfoContext } from '../componentInfo/componentInfoContext';
import { EXCLUDED_COMPONENTS, COMPONENT_GROUP } from '../config';
import { componentLibaries } from '../utils/componentLibraries';

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

  const filterRegexp = React.useMemo(() => new RegExp(filter, 'i'), [filter]);

  const handleMouseDown = React.useCallback(
    componentInfo => e => {
      if (onDragStart) onDragStart(componentInfo, e);
    },
    [onDragStart],
  );

  const handleFilterChange = React.useCallback((e, { value }) => {
    setFilter(value);
  }, []);

  const [supportedComponents, unsupportedComponents] = React.useMemo(
    () =>
      _.partition(_.values(componentInfoContext.byDisplayName), ({ displayName }) => {
        return displayName.match(filterRegexp) && !EXCLUDED_COMPONENTS.some(name => name === displayName);
      }),
    [filterRegexp],
  );

  const titleComponent = (Component, { content, expanded, ...rest }) => {
    return (
      <Component {...rest}>
        {expanded ? <TriangleDownIcon /> : <TriangleEndIcon />}
        {content}
      </Component>
    );
  };

  const treeObj: Record<string, any> = React.useMemo(
    () =>
      Object.keys(COMPONENT_GROUP).reduce((acc, key) => {
        return {
          ...acc,
          [key]: {
            id: key,
            title: {
              children: titleComponent,
              content: key,
            },
            items: supportedComponents
              .filter(info => {
                const componentName = info.isChild ? info.parentDisplayName : info.displayName;
                const componentType = componentName.split('.')[1] || componentName;
                return (
                  componentName.startsWith(componentLibrary.prefix) && COMPONENT_GROUP[key].includes(componentType)
                );
              })
              .map(info => ({
                id: info.displayName,
                title: (
                  <Box
                    as="span"
                    key={info.displayName}
                    onMouseDown={handleMouseDown(info)}
                    styles={{
                      padding: '0.25rem 0.75rem',
                      cursor: 'pointer',
                      ':hover': {
                        background: '#ddd',
                        borderLeft: '2px solid #000',
                      },
                      borderLeft: '2px solid transparent',
                      marginLeft: '2px',
                    }}
                  >
                    {info.shortName || info.displayName}
                  </Box>
                ),
              })),
          },
        };
      }, {}),
    [handleMouseDown, supportedComponents, componentLibrary],
  );
  const treeItems = Object.values(treeObj).filter(treeItem => treeItem.items.length > 0);

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
        appearance="filled-darker"
        value={componentLibrary.name}
        onChange={onChangeComponentLibrary}
      >
        {componentLibaries.map(l => (
          <option key={l.name}>{l.name}</option>
        ))}
      </Select>
      <Input
        fluid
        icon={<SearchIcon />}
        clearable
        placeholder="Search..."
        onChange={handleFilterChange}
        value={filter}
      />
      {filter ? <Tree items={treeItems} activeItemIds={treeItems.map(e => e.id)} /> : <Tree items={treeItems} />}
      {unsupportedComponents
        .filter(info => info.displayName.match(filterRegexp))
        .map(info => (
          <Tooltip
            pointing
            position="after"
            align="center"
            key={info.displayName}
            trigger={
              <Box
                key={info.displayName}
                styles={{
                  padding: '0.2em 0.5em',
                  background: '#eee',
                  color: '#888',
                }}
              >
                {info.shortName || info.displayName}
              </Box>
            }
            content={info.docblock.description + info.docblock.tags}
          />
        ))}
    </div>
  );
};
