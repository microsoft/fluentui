import * as React from 'react';
import {
  Box,
  Button,
  Image,
  MenuButton,
  Toolbar as FUIToolbar,
  ToolbarItemProps,
  Tooltip,
} from '@fluentui/react-northstar';
import { DesignerMode } from './types';
import {
  CodeSnippetIcon,
  OpenOutsideIcon,
  TrashCanIcon,
  UndoIcon,
  RedoIcon,
  TranslationIcon,
  EyeIcon,
} from '@fluentui/react-icons-northstar';

export type ToolbarProps = {
  isExpanding: boolean;
  isSelecting: boolean;

  canRedo: boolean;
  canUndo: boolean;
  onModeChange: (mode: DesignerMode) => void;
  onReset: () => void;
  onUndo: () => void;
  onRedo: () => void;

  mode: DesignerMode;

  showCode: boolean;
  showJSONTree: boolean;
  showAccessibilityErrors: boolean;

  onShowCodeChange: (showCode: boolean) => void;
  onShowJSONTreeChange: (showJSONTree: boolean) => void;
  onShowAccessibiltyErrors: (showAccessibiltyErrors: boolean) => void;

  enabledVirtualCursor: boolean;
  onEnableVirtualCursor: (enableVirtualCursor: boolean) => void;

  style?: React.CSSProperties;
};

export const Toolbar: React.FunctionComponent<ToolbarProps> = ({
  isExpanding,
  isSelecting,
  canRedo,
  canUndo,
  onUndo,
  onRedo,

  onModeChange,
  onReset,

  showAccessibilityErrors,
  onShowAccessibiltyErrors,
  showCode,
  onShowCodeChange,
  showJSONTree,
  onShowJSONTreeChange,

  mode,
  enabledVirtualCursor,
  onEnableVirtualCursor,
  style,
}) => {
  const [showVcInfo, setShowVcInfo] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
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
        <FUIToolbar
          aria-label="Builder toolbar"
          items={[
            {
              key: 'mode',
              children: <b aria-label={`${mode} - change mode`}>{mode.replace(/^\w/, c => c.toUpperCase())}</b>,
              active: menuOpen,
              menuOpen,
              onMenuOpenChange: (_: any, { menuOpen }: any) => setMenuOpen(menuOpen),
              menu: {
                items: [
                  {
                    key: 'build',
                    content: 'Build',
                    onClick: () => {
                      onModeChange('build');
                      onEnableVirtualCursor(false);
                    },
                  },
                  {
                    key: 'design',
                    content: 'Design',
                    onClick: () => {
                      onModeChange('design');
                      onEnableVirtualCursor(false);
                    },
                  },
                  {
                    key: 'use',
                    content: 'Use',
                    onClick: () => {
                      onModeChange('use');
                    },
                  },
                ],
              },
            },
            {
              key: 'divider-1',
              kind: 'divider',
            },
            {
              icon: <UndoIcon outline={true} />,
              key: 'undo',
              // kind: 'toggle',
              disabled: !canUndo,
              title: 'Undo',
              onClick: () => {
                onUndo();
              },
            },
            {
              icon: <RedoIcon outline={true} />,
              key: 'redo',
              // kind: 'toggle',
              disabled: !canRedo,
              title: 'Redo',
              onClick: () => {
                onRedo();
              },
            },
            {
              key: 'divider-2',
              kind: 'divider',
            },
            {
              icon: <TrashCanIcon outline={true} />,
              key: 'delete',
              // kind: 'toggle',
              title: 'Start over',
              onClick: () => {
                onReset();
              },
            },
            mode === 'use'
              ? ({
                  key: 'screen-reader',
                  icon: <TranslationIcon outline={true} />,
                  kind: 'toggle',
                  active: !!enabledVirtualCursor,
                  title: 'Screen reader simulation',
                  onClick: () => {
                    onEnableVirtualCursor(!enabledVirtualCursor);
                    setShowVcInfo(true);
                    setTimeout(() => setShowVcInfo(false), 10000);
                  },
                  children: (C, p) => (
                    <Tooltip
                      accessibility={null}
                      trigger={<C {...p} />}
                      content={<span role="alert">Use Ctrl + , and Ctrl + . to navigate in the canvas</span>}
                      open={enabledVirtualCursor && showVcInfo}
                    />
                  ),
                } as ToolbarItemProps)
              : undefined,
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
        &emsp;
        <Button
          text
          onClick={onShowAccessibiltyErrors(!showAccessibilityErrors)}
          icon={<EyeIcon />}
          content="Accessibility Errors [Ctrl+A]"
        />
        &emsp;
        <Button text onClick={onReset} icon={<TrashCanIcon />} content="Start Over" />
      </div>
    </Box>
  );
};
