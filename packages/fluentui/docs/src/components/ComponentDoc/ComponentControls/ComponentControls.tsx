import * as _ from 'lodash';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { CopyToClipboard } from '@fluentui/docs-components';
import { CircleIcon, EditIcon, IndentIcon, LinkIcon, OpenOutsideIcon } from '@fluentui/react-icons-northstar';
import { Menu, menuAsToolbarBehavior, MenuItem, MenuProps, Tooltip } from '@fluentui/react-northstar';

import { ComponentSourceManagerLanguage } from '../ComponentSourceManager';
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

  const items: MenuProps['items'] = [
    {
      icon: <CodeSnippetIcon />,
      onClick: onShowCode,
      active: showCode,
      children: (Component: typeof MenuItem, props) => (
        <Tooltip content="Try it" key="show-code" trigger={<Component {...props} />} />
      ),
    },

    {
      icon: <EditIcon />,
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
      icon: <CircleIcon outline />,
      onClick: onShowTransparent,
      active: showTransparent,
      children: (Component: typeof MenuItem, props) => (
        <Tooltip content="Transparent" key="show-transparent" trigger={<Component {...props} />} />
      ),
    },
    {
      icon: <IndentIcon rotate={180} />,
      onClick: onShowRtl,
      active: showRtl,
      children: (Component: typeof MenuItem, props) => (
        <Tooltip content="RTL" key="show-rtl" trigger={<Component {...props} />} />
      ),
    },

    {
      icon: <OpenOutsideIcon />,
      children: (Component: typeof MenuItem, props) => (
        <Tooltip content="Popout" key="maximize" trigger={<Component {...props} />} />
      ),
      as: NavLink,
      to: `/maximize/${_.kebabCase(examplePath.split('/').slice(-1).pop())}/${showRtl}`,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      key: 'divider-2',
      style: { margin: '0 5px' },
      kind: 'divider',
    },
    {
      icon: <LinkIcon />,
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
};

export default React.memo(ComponentControls);
