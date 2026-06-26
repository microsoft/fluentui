import * as React from 'react';
import { IconButton, TooltipLinkList, WithTooltip } from 'storybook/internal/components';
import { PaintBrushIcon } from '@storybook/icons';
import { useParameter } from 'storybook/manager-api';

import type { JSXElement } from '@fluentui/react-utilities';
import type { CapIds } from '../cap';
import { capOptions, defaultCap } from '../cap';
import { CAP_ID } from '../constants';
import type { FluentParameters } from '../hooks';
import { useGlobals } from '../hooks';

export interface CapSelectorItem {
  id: string;
  title: string;
  onClick: () => void;
  value: string;
  active: boolean;
}

function createCapItems(
  value: typeof capOptions,
  changeCap: (id: CapIds) => void,
  getCurrentCap: () => CapIds,
): CapSelectorItem[] {
  return value.map(item => {
    return {
      id: item.id,
      title: item.id === defaultCap.id ? `${item.label} (Default)` : item.label,
      onClick: () => {
        changeCap(item.id);
      },
      value: item.id,
      active: getCurrentCap() === item.id,
    };
  });
}

/**
 * Toolbar picker that selects the CAP visual-language overlay on top of the
 * currently selected Fluent base theme. When `cap` is active, the
 * FluentProvider decorator applies `CAP_STYLE_HOOKS` from
 * `@fluentui-contrib/react-cap-theme`.
 */
export const VisualLanguagePicker = (): JSXElement => {
  const [globals, updateGlobals] = useGlobals();
  const capParameter: FluentParameters['cap'] = useParameter('cap');

  const selectedCapId: CapIds = capParameter ?? globals[CAP_ID] ?? defaultCap.id;
  const selectedCap = capOptions.find(entry => entry.id === selectedCapId);

  const isActive = selectedCapId !== defaultCap.id;

  const setCap = React.useCallback(
    (id: CapIds) => {
      updateGlobals({ [CAP_ID]: id });
    },
    [updateGlobals],
  );

  const renderTooltip = React.useCallback(
    (props: { onHide: () => void }) => {
      return (
        <TooltipLinkList
          links={createCapItems(
            capOptions,
            id => {
              setCap(id);
              props.onHide();
            },
            () => selectedCapId,
          )}
        />
      );
    },
    [selectedCapId, setCap],
  );

  return (
    <WithTooltip placement="top" trigger="click" closeOnOutsideClick tooltip={renderTooltip}>
      <IconButton key={CAP_ID} title="Change visual language" active={isActive}>
        <PaintBrushIcon />
        <span style={{ marginLeft: 5 }}>Visual Language: {selectedCap?.label}</span>
      </IconButton>
    </WithTooltip>
  );
};
