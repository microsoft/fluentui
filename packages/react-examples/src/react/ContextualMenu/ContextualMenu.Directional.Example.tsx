import * as React from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Toggle } from '@fluentui/react/lib/Toggle';
import {
  ContextualMenuItemType,
  DirectionalHint,
  IContextualMenuProps,
  IContextualMenuItem,
} from '@fluentui/react/lib/ContextualMenu';
import { Dropdown, IDropdownOption, IDropdownStyles } from '@fluentui/react/lib/Dropdown';
import { getRTL } from '@fluentui/react/lib/Utilities';
import { Stack, IStackTokens } from '@fluentui/react/lib/Stack';
import { useBoolean } from '@fluentui/react-hooks';

export const ContextualMenuDirectionalExample: React.FunctionComponent = () => {
  const [isBeakVisible, { toggle: toggleIsBeakVisible }] = useBoolean(false);
  const [useDirectionalHintForRTL, { toggle: toggleUseDirectionalHintForRTL }] = useBoolean(false);
  const [directionalHint, setDirectionalHint] = React.useState<DirectionalHint>(DirectionalHint.bottomLeftEdge);
  const [directionalHintForRTL, setDirectionalHintForRTL] = React.useState<DirectionalHint>(
    DirectionalHint.bottomLeftEdge,
  );

  const onDirectionalChanged = React.useCallback(
    (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
      setDirectionalHint(option.key as DirectionalHint);
    },
    [],
  );

  const onDirectionalRtlChanged = React.useCallback(
    (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
      setDirectionalHintForRTL(option.key as DirectionalHint);
    },
    [],
  );

  const menuProps: IContextualMenuProps = React.useMemo(
    () => ({
      isBeakVisible: isBeakVisible,
      directionalHint: directionalHint,
      directionalHintForRTL: useDirectionalHintForRTL ? directionalHintForRTL : undefined,
      gapSpace: 0,
      beakWidth: 20,
      directionalHintFixed: false,
      items: menuItems,
    }),
    [isBeakVisible, directionalHint, directionalHintForRTL, useDirectionalHintForRTL],
  );

  return (
    <div>
      <Stack horizontal wrap tokens={stackTokens}>
        <Toggle label="Show beak" checked={isBeakVisible} onChange={toggleIsBeakVisible} />
        <Dropdown
          label="Directional hint"
          selectedKey={directionalHint}
          options={directionOptions}
          onChange={onDirectionalChanged}
          styles={dropdownStyles}
        />
        {getRTL() && (
          <Toggle
            label="Use RTL directional hint"
            checked={useDirectionalHintForRTL}
            onChange={toggleUseDirectionalHintForRTL}
          />
        )}
        {getRTL() && (
          <Dropdown
            label="Directional hint for RTL"
            selectedKey={directionalHintForRTL}
            options={directionOptions}
            onChange={onDirectionalRtlChanged}
            disabled={!useDirectionalHintForRTL}
            styles={dropdownStyles}
          />
        )}
      </Stack>
      <br />
      <DefaultButton text="Show context menu" menuProps={menuProps} />
    </div>
  );
};

const menuItems: IContextualMenuItem[] = [
  { key: 'newItem', text: 'New' },
  { key: 'divider_1', itemType: ContextualMenuItemType.Divider },
  { key: 'rename', text: 'Rename' },
  { key: 'edit', text: 'Edit' },
  { key: 'properties', text: 'Properties' },
  { key: 'disabled', text: 'Disabled item', disabled: true },
];

const directionOptions: IDropdownOption[] = [
  { key: DirectionalHint.topLeftEdge, text: 'Top left edge' },
  { key: DirectionalHint.topCenter, text: 'Top center' },
  { key: DirectionalHint.topRightEdge, text: 'Top right edge' },
  { key: DirectionalHint.topAutoEdge, text: 'Top auto edge' },
  { key: DirectionalHint.bottomLeftEdge, text: 'Bottom left edge' },
  { key: DirectionalHint.bottomCenter, text: 'Bottom center' },
  { key: DirectionalHint.bottomRightEdge, text: 'Bottom right edge' },
  { key: DirectionalHint.bottomAutoEdge, text: 'Bottom auto edge' },
  { key: DirectionalHint.leftTopEdge, text: 'Left top edge' },
  { key: DirectionalHint.leftCenter, text: 'Left center' },
  { key: DirectionalHint.leftBottomEdge, text: 'Left bottom edge' },
  { key: DirectionalHint.rightTopEdge, text: 'Right top edge' },
  { key: DirectionalHint.rightCenter, text: 'Right center' },
  { key: DirectionalHint.rightBottomEdge, text: 'Right bottom edge' },
];

const stackTokens: Partial<IStackTokens> = { childrenGap: 30 };
const dropdownStyles: Partial<IDropdownStyles> = { root: { width: 200 } };
