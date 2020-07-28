import * as _ from 'lodash';
import * as React from 'react';
import { Box, Menu, Input, Tree } from '@fluentui/react-northstar';
import { SearchIcon, TriangleDownIcon, TriangleEndIcon } from '@fluentui/react-icons-northstar';
import { ComponentInfo } from '../componentInfo/types';
import { componentInfoContext } from '../componentInfo/componentInfoContext';
import { EXCLUDED_COMPONENTS, COMPONENT_GROUP } from '../config';

export type ListDisplayModes = 'Display Name' | 'Rendered';

export type ListProps = {
  onDragStart?: (componentInfo: ComponentInfo, e: MouseEvent) => void;
  style?: React.CSSProperties;
};

export const List: React.FunctionComponent<ListProps> = ({ onDragStart, style }) => {
  const [displayMode, setDisplayMode] = React.useState<ListDisplayModes>('Display Name');
  const [filter, setFilter] = React.useState<string>('');

  const filterRegexp = new RegExp(filter, 'i');

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
        return !EXCLUDED_COMPONENTS.some(name => name === displayName);
      }),
    [],
  );

  const titleComponent = (Component, { content, expanded, ...rest }) => {
    return (
      <div {...rest}>
        {expanded ? <TriangleDownIcon /> : <TriangleEndIcon />}
        {content}
      </div>
    );
  };

  const treeobj = React.useMemo(
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
              .filter(info => COMPONENT_GROUP[key].includes(info.isChild ? info.parentDisplayName : info.displayName))
              .map(info => ({
                id: info.displayName,
                title: (
                  <Box
                    key={info.displayName}
                    onMouseDown={handleMouseDown(info)}
                    styles={{
                      padding: '0.25em 0.75em',
                      cursor: 'pointer',
                      ':hover': {
                        background: '#ddd',
                        borderLeft: '2px solid #000',
                      },
                      borderLeft: '2px solid transparent',
                      marginLeft: '2px',
                    }}
                  >
                    {displayMode === 'Rendered' && (
                      <div style={{ position: 'relative' }}>
                        <div style={{ fontWeight: 'bold', opacity: 0.5 }}>{info.displayName}</div>
                        <div style={{ padding: '0.5rem', pointerEvents: 'none' }}>
                          {/* FIXME {React.createElement(resolveComponent(info.displayName), resolveDraggingProps(info.displayName))} */}
                        </div>
                      </div>
                    )}

                    {displayMode === 'Display Name' && info.displayName}
                  </Box>
                ),
              })),
          },
        };
      }, {}),
    [displayMode, handleMouseDown, supportedComponents],
  );

  return (
    <div
      style={{
        ...style,
        boxShadow: '1px 0px 3px rgba(0, 0, 0, 0.2)',
        userSelect: 'none',
      }}
    >
      <Menu
        underlined
        fluid
        styles={{ padding: '0.5em 0.5em 0 0.5em' }}
        items={[
          {
            key: 'name',
            content: 'Name',
            'data-display-mode': 'Display Name',
          },
          {
            key: 'preview',
            content: 'Preview',
            'data-display-mode': 'Rendered',
          },
        ]}
        defaultActiveIndex={0}
        onItemClick={(e, props) => {
          setDisplayMode(props['data-display-mode']);
        }}
      />
      <Input
        fluid
        icon={<SearchIcon />}
        clearable
        placeholder="Search..."
        onChange={handleFilterChange}
        value={filter}
      />
      <Tree items={Object.values(treeobj)} />
      {unsupportedComponents
        .filter(info => info.displayName.match(filterRegexp))
        .map(info => (
          <Box
            key={info.displayName}
            styles={{
              padding: '0.2em 0.5em',
              background: '#eee',
              color: '#888',
            }}
          >
            {info.displayName}
          </Box>
        ))}
    </div>
  );
};
