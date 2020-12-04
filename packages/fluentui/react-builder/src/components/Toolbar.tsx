import * as React from 'react';
import {
  Button,
  Checkbox,
  Image,
  RadioGroup,
  RadioGroupItemProps,
  Toolbar as FUIToolbar,
} from '@fluentui/react-northstar';
import { DesignerMode } from './types';
import { OpenOutsideIcon, TrashCanIcon, UndoIcon, RedoIcon } from '@fluentui/react-icons-northstar';

export type ToolbarProps = {
  isExpanding: boolean;
  isSelecting: boolean;
  canRedo: boolean;
  canUndo: boolean;
  onModeChange: (mode: DesignerMode) => void;
  onReset: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onShowCodeChange: (showCode: boolean) => void;
  onShowJSONTreeChange: (showJSONTree: boolean) => void;
  mode: DesignerMode;
  showCode: boolean;
  showJSONTree: boolean;
  style?: React.CSSProperties;
};

export const Toolbar: React.FunctionComponent<ToolbarProps> = ({
  isExpanding,
  isSelecting,
  canRedo,
  canUndo,
  onModeChange,
  onReset,
  onUndo,
  onRedo,
  onShowCodeChange,
  onShowJSONTreeChange,
  mode,
  showCode,
  showJSONTree,
  style,
}) => (
  <div
    style={{
      display: 'flex',
      padding: '0 1rem',
      alignItems: 'center',
      borderBottom: '1px solid #E1DFDD', //TODO: replace with `Default Border 2` color scheme token
      background: '#FAF9F8', //TODO: replace with `Default Background 1` color scheme token
      ...style,
    }}
  >
    <Image
      styles={{ height: '1.5rem' }}
      src="https://fabricweb.azureedge.net/fabric-website/assets/images/fluent-ui-logo.png"
    />
    <div style={{ position: 'relative', padding: '0 .8rem', fontSize: '14px', lineHeight: 1, fontWeight: 'bold' }}>
      FluentUI <span style={{ fontWeight: 'normal' }}>Builder</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
      <div>
        <strong>Mode:</strong>
        &emsp;
        <RadioGroup
          style={{ display: 'inline-block' }}
          checkedValue={mode}
          onCheckedValueChange={(e, data: RadioGroupItemProps & { value: DesignerMode }) => {
            onModeChange(data.value);
          }}
          items={[
            {
              key: 'build',
              label: 'Build',
              value: 'build',
            },
            {
              key: 'design',
              label: 'Design',
              value: 'design',
            },
            {
              key: 'use',
              label: 'Use',
              value: 'use',
            },
          ]}
        />
      </div>
      <FUIToolbar
        aria-label="Builder toolbar"
        items={[
          {
            key: 'divider-1',
            kind: 'divider',
          },
          {
            icon: (
              <UndoIcon
                {...{
                  outline: true,
                }}
              />
            ),
            key: 'undo',
            // kind: 'toggle',
            disabled: !canUndo,
            title: 'Undo',
            onClick: () => {
              onUndo;
            },
          },
          {
            icon: (
              <RedoIcon
                {...{
                  outline: true,
                }}
              />
            ),
            key: 'redo',
            // kind: 'toggle',
            disabled: !canRedo,
            title: 'Redo',
            onClick: () => {
              onRedo;
            },
          },
          {
            key: 'divider-2',
            kind: 'divider',
          },
          {
            icon: (
              <TrashCanIcon
                {...{
                  outline: true,
                }}
              />
            ),
            key: 'delete',
            // kind: 'toggle',
            title: 'Start over',
            onClick: () => {
              onReset;
            },
          },
        ]}
      />
    </div>
    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
      <Checkbox label="Show Code" toggle checked={!!showCode} onChange={(e, data) => onShowCodeChange(data.checked)} />
      &emsp;
      <Checkbox
        label="Show JSON"
        toggle
        checked={!!showJSONTree}
        onChange={(e, data) => onShowJSONTreeChange(data.checked)}
      />
      &emsp;
      <Button
        iconOnly
        icon={<OpenOutsideIcon />}
        aria-label="Popout"
        onClick={() => {
          window.open(`/builder/maximize${window.location.hash}`, '_blank', 'noopener noreferrer');
        }}
      />
    </div>
  </div>
);
