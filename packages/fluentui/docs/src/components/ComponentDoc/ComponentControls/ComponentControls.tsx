import { CopyToClipboard, ComponentControlsCodeSandbox, CodeSandboxState } from '@fluentui/docs-components';
import { Menu, menuAsToolbarBehavior, Tooltip, Loader, MenuProps, MenuItem } from '@fluentui/react-northstar';
import * as _ from 'lodash';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { imports } from '../../Playground/renderConfig';
import { ComponentSourceManagerLanguage } from '../ComponentSourceManager';

import {
  EditIcon,
  FilesCodeIcon,
  CircleIcon,
  LinkIcon,
  OpenOutsideIcon,
  AcceptIcon,
  IndentIcon,
} from '@fluentui/react-icons-northstar';
import CodeSnippetIcon from './CodeSnippetIcon';

type ComponentControlsProps = {
  exampleCode: string;
  exampleLanguage: ComponentSourceManagerLanguage;
  examplePath: string;
  anchorName: string;
  onCopyLink: (e: React.SyntheticEvent) => void;
  onShowCode: (e: React.SyntheticEvent) => void;
  onShowRtl: (e: React.SyntheticEvent) => void;
  onShowTransparent: (e: React.SyntheticEvent) => void;
  onShowVariables: (e: React.SyntheticEvent) => void;
  showCode: boolean;
  showRtl: boolean;
  showVariables: boolean;
  showTransparent: boolean;
  titleForAriaLabel?: string;
};

const ComponentControls: React.FC<ComponentControlsProps> = props => {
  const {
    anchorName,
    exampleCode,
    exampleLanguage,
    examplePath,
    showCode,
    showRtl,
    showVariables,
    showTransparent,
    onCopyLink,
    onShowCode,
    onShowRtl,
    onShowTransparent,
    onShowVariables,
    titleForAriaLabel,
    ...rest
  } = props;

  return (
    <ComponentControlsCodeSandbox
      exampleCode={exampleCode}
      exampleLanguage={exampleLanguage}
      exampleName={examplePath}
      imports={imports}
    >
      {(state, onCodeSandboxClick) => {
        const codeSandboxTooltip =
          state === CodeSandboxState.Default
            ? 'CodeSandbox'
            : state === CodeSandboxState.Loading
            ? 'Exporting...'
            : 'Click to open';

        const codeSandboxIcon =
          state === CodeSandboxState.Default ? (
            <FilesCodeIcon style={{ width: '20px', height: '20px' }} />
          ) : state === CodeSandboxState.Loading ? (
            <Loader size="small" style={{ width: '20px', height: '20px' }} />
          ) : (
            <AcceptIcon style={{ width: '20px', height: '20px' }} />
          );

        const items: MenuProps['items'] = [
          {
            icon: <CodeSnippetIcon style={{ width: '20px', height: '20px' }} />,
            onClick: onShowCode,
            active: showCode,
            children: (Component: typeof MenuItem, props) => (
              <Tooltip content="Try it" key="show-code" trigger={<Component {...props} />} />
            ),
          },

          {
            icon: <EditIcon style={{ width: '20px', height: '20px' }} />,
            onClick: onShowVariables,
            active: showVariables,
            children: (Component: typeof MenuItem, props) => (
              <Tooltip content="Theme it" key="show-variables" trigger={<Component {...props} />} />
            ),
          },
          {
            key: 'divider-1',
            style: { margin: '0 5px' },
            kind: 'divider',
          },
          {
            icon: <CircleIcon outline style={{ width: '20px', height: '20px' }} />,
            onClick: onShowTransparent,
            active: showTransparent,
            children: (Component: typeof MenuItem, props) => (
              <Tooltip content="Transparent" key="show-transparent" trigger={<Component {...props} />} />
            ),
          },
          {
            icon: <IndentIcon rotate={180} style={{ width: '20px', height: '20px' }} />,
            onClick: onShowRtl,
            active: showRtl,
            children: (Component: typeof MenuItem, props) => (
              <Tooltip content="RTL" key="show-rtl" trigger={<Component {...props} />} />
            ),
          },

          {
            icon: <OpenOutsideIcon style={{ width: '20px', height: '20px' }} />,
            children: (Component: typeof MenuItem, props) => (
              <Tooltip content="Popout" key="maximize" trigger={<Component {...props} />} />
            ),
            as: NavLink,
            to: `/maximize/${_.kebabCase(
              examplePath
                .split('/')
                .slice(-1)
                .pop(),
            )}/${showRtl}`,
            target: '_blank',
            rel: 'noopener noreferrer',
          },
          {
            key: 'divider-2',
            style: { margin: '0 5px' },
            kind: 'divider',
          },
          {
            onClick: onCodeSandboxClick,
            icon: codeSandboxIcon,
            children: (Component: typeof MenuItem, props) => (
              <Tooltip content={codeSandboxTooltip} key="show-codesandbox" trigger={<Component {...props} />} />
            ),
          },
          {
            icon: <LinkIcon style={{ width: '20px', height: '20px' }} />,
            children: (Component: typeof MenuItem, props) => (
              <CopyToClipboard key="copy-link" value={anchorName}>
                {(active, onClick) => (
                  <Tooltip
                    content={active ? 'Copied!' : 'Permalink'}
                    trigger={
                      <Component
                        {...props}
                        onClick={(e: React.SyntheticEvent) => {
                          onClick();
                          onCopyLink(e);
                        }}
                      />
                    }
                  />
                )}
              </CopyToClipboard>
            ),
          },
        ];

        return (
          <Menu
            {...rest}
            iconOnly
            accessibility={menuAsToolbarBehavior}
            aria-label={`Actions for ${titleForAriaLabel || 'untitled'} example`}
            items={items}
          />
        );
      }}
    </ComponentControlsCodeSandbox>
  );
};

export default React.memo(ComponentControls);
