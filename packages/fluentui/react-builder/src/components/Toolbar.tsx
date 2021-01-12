import * as React from 'react';
import { Box, Button, Image, MenuButton, Toolbar as FUIToolbar } from '@fluentui/react-northstar';
import { DesignerMode } from './types';
import { CodeSnippetIcon, OpenOutsideIcon, TrashCanIcon, UndoIcon, RedoIcon } from '@fluentui/react-icons-northstar';

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
  <Box
    styles={({ theme }) => ({
      display: 'flex',
      padding: '0 1rem',
      alignItems: 'center',
      borderBottom: `1px solid ${theme.siteVariables.colorScheme.default.border2}`,
      background: theme.siteVariables.colorScheme.default.background1,
      ...style,
    })}
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
        <MenuButton
          trigger={
            <Button text iconOnly content={mode.replace(/^\w/, c => c.toUpperCase())} aria-label="Select mode" />
          }
          menu={[
            {
              key: 'build',
              content: 'Build',
              onClick: () => {
                onModeChange('build');
              },
            },
            {
              key: 'design',
              content: 'Design',
              onClick: () => {
                onModeChange('design');
              },
            },
            {
              key: 'use',
              content: 'Use',
              onClick: () => {
                onModeChange('use');
              },
            },
          ]}
          on="click"
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
      <MenuButton
        trigger={<Button iconOnly icon={<CodeSnippetIcon outline />} aria-label="Show code" />}
        menu={[
          {
            key: 'code',
            content: 'Show code',
            onClick: () => {
              onShowCodeChange(!showCode);
              if (showJSONTree) onShowJSONTreeChange(!showJSONTree);
            },
          },
          {
            key: 'json',
            content: 'Show JSON',
            onClick: () => {
              onShowJSONTreeChange(!showJSONTree);
              if (showCode) onShowCodeChange(!showCode);
            },
          },
        ]}
      />
      <Button
        style={{ marginLeft: '.8rem' }}
        iconOnly
        icon={<OpenOutsideIcon outline />}
        aria-label="Popout"
        onClick={() => {
          window.open(`/builder/maximize${window.location.hash}`, '_blank', 'noopener noreferrer');
        }}
      />
    </div>
  </Box>
);
