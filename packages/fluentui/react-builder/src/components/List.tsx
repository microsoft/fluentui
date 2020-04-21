import * as _ from 'lodash';
import * as React from 'react';
import { Box, Menu } from '@fluentui/react-northstar';
import { ComponentInfo } from '@fluentui/docs/src/types';
import componentInfoContext from '@fluentui/docs/src/utils/componentInfoContext';
import { DRAGGING_ELEMENTS } from '../config';

export type ListDisplayModes = 'Display Name' | 'Rendered';

const List = ({
  onDragStart,
  style,
}: {
  onDragStart?: (componentInfo: ComponentInfo, e: MouseEvent) => any;
  style?: React.CSSProperties;
}) => {
  const [displayMode, setDisplayMode] = React.useState<ListDisplayModes>('Display Name');

  const handleMouseDown = React.useCallback(
    componentInfo => e => {
      if (onDragStart) onDragStart(componentInfo, e);
    },
    [],
  );

  const [supportedComponents, unsupportedComponents] = _.partition(
    _.values(componentInfoContext.byDisplayName),
    ({ displayName }) => {
      return !!DRAGGING_ELEMENTS[displayName];
    },
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

      {supportedComponents.map(info => (
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
      ))}
      {unsupportedComponents.map(info => (
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

List.defaultProps = {
  displayMode: 'rendered',
};

export default List;
