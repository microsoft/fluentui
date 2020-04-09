import * as React from 'react';
import { Button, Checkbox, Text } from '@fluentui/react-northstar';
import Logo from '@fluentui/docs/src/components/Logo/Logo';
import { DesignerMode } from './types';
import { OpenOutsideIcon } from '@fluentui/react-icons-northstar';

const Toolbar = ({
  style,
  onReset,
  onModeChange,
  onShowCodeChange,
  onShowJSONTreeChange,
  onSelectingChange,
  mode,
  showCode,
  showJSONTree,
  isSelecting,
}: {
  style?: React.CSSProperties;
  onReset: () => void;
  onModeChange: (mode: DesignerMode) => void;
  onShowCodeChange: (showCode: boolean) => void;
  onShowJSONTreeChange: (showJSONTree: boolean) => void;
  onSelectingChange: (isSelecting: boolean) => void;
  mode: DesignerMode;
  showCode: boolean;
  showJSONTree: boolean;
  isSelecting: boolean;
}) => (
  <div
    style={{
      display: 'flex',
      padding: '0 1rem',
      alignItems: 'center',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.25)',
      ...style,
    }}
  >
    <Logo styles={{ height: '1.5rem', marginRight: '0.25rem' }} />
    <div style={{ fontSize: '18px', lineHeight: 1, marginTop: '0.8rem', marginRight: '1rem' }}>
      FluentUI
      <div style={{ fontSize: '11px', lineHeight: 1, opacity: 0.625, textAlign: 'right' }}>builder</div>
    </div>
    &emsp;
    <Checkbox
      label="Build Mode"
      toggle
      checked={mode === 'build'}
      onChange={(e, data) => onModeChange(data.checked ? 'build' : 'use')}
    />
    <Text as="a" href="/builder/maximize" target="_blank" rel="noopener noreferrer">
      <OpenOutsideIcon />
    </Text>
    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
      &emsp;
      <Checkbox label="Show Code" toggle checked={!!showCode} onChange={(e, data) => onShowCodeChange(data.checked)} />
      &emsp;
      <Checkbox
        label="Show JSON"
        toggle
        checked={!!showJSONTree}
        onChange={(e, data) => onShowJSONTreeChange(data.checked)}
      />
      &emsp;
      <Checkbox
        label="Inspect"
        toggle
        checked={!!isSelecting}
        onChange={(e, data) => onSelectingChange(data.checked)}
      />
      &emsp;
      <div>
        <code>
          <strong>⌥ ⌃ C</strong>
        </code>{' '}
        - Select a component
      </div>
      &emsp;
      <Button onClick={onReset} content="Start Over" />
    </div>
  </div>
);

export default Toolbar;
