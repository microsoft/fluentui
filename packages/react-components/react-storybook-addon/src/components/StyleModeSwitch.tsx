import * as React from 'react';
import { IconButton, TooltipLinkList, WithTooltip } from 'storybook/internal/components';
import { PaintBrushIcon } from '@storybook/icons';

import type { JSXElement } from '@fluentui/react-utilities';
import { STYLE_MODE_ID } from '../constants';
import { useGlobals } from '../hooks';

interface StyleModeItem {
  id: string;
  title: string;
  onClick: () => void;
  value: string;
  active: boolean;
}

const styleModes = [
  { id: 'fluent', label: 'Fluent (Default)' },
  { id: 'cap', label: 'CAP' },
] as const;

function createStyleModeItems(changeMode: (id: string) => void, getCurrentMode: () => string): StyleModeItem[] {
  return styleModes.map(item => ({
    id: item.id,
    title: item.label,
    onClick: () => changeMode(item.id),
    value: item.id,
    active: getCurrentMode() === item.id,
  }));
}

export const StyleModeSwitch = (): JSXElement => {
  const [globals, updateGlobals] = useGlobals();

  const selectedMode = globals[STYLE_MODE_ID] ?? 'fluent';
  const selectedLabel = styleModes.find(m => m.id === selectedMode)?.label ?? 'Fluent (Default)';
  const isActive = selectedMode !== 'fluent';

  const setMode = React.useCallback(
    (id: string) => {
      updateGlobals({ [STYLE_MODE_ID]: id });
    },
    [updateGlobals],
  );

  const renderTooltip = React.useCallback(
    (props: { onHide: () => void }) => {
      return (
        <TooltipLinkList
          links={createStyleModeItems(
            id => {
              setMode(id);
              props.onHide();
            },
            () => selectedMode,
          )}
        />
      );
    },
    [selectedMode, setMode],
  );

  return (
    <WithTooltip placement="top" trigger="click" closeOnOutsideClick tooltip={renderTooltip}>
      <IconButton key={STYLE_MODE_ID} title="Change Style Mode" active={isActive}>
        <PaintBrushIcon />
        <span style={{ marginLeft: 5 }}>Style: {selectedLabel}</span>
      </IconButton>
    </WithTooltip>
  );
};
