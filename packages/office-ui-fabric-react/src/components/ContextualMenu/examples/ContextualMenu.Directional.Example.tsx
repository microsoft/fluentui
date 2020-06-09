import * as React from 'react';
import { useConstCallback } from '@uifabric/react-hooks';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Checkbox, ICheckboxStyles } from 'office-ui-fabric-react/lib/Checkbox';
import {
  ContextualMenuItemType,
  DirectionalHint,
  IContextualMenuProps,
  IContextualMenuItem,
} from 'office-ui-fabric-react/lib/ContextualMenu';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { getRTL } from 'office-ui-fabric-react/lib/Utilities';
import './ContextualMenuExample.scss';

const DIRECTION_OPTIONS = [
  { key: DirectionalHint.topLeftEdge, text: 'Top Left Edge' },
  { key: DirectionalHint.topCenter, text: 'Top Center' },
  { key: DirectionalHint.topRightEdge, text: 'Top Right Edge' },
  { key: DirectionalHint.topAutoEdge, text: 'Top Auto Edge' },
  { key: DirectionalHint.bottomLeftEdge, text: 'Bottom Left Edge' },
  { key: DirectionalHint.bottomCenter, text: 'Bottom Center' },
  { key: DirectionalHint.bottomRightEdge, text: 'Bottom Right Edge' },
  { key: DirectionalHint.bottomAutoEdge, text: 'Bottom Auto Edge' },
  { key: DirectionalHint.leftTopEdge, text: 'Left Top Edge' },
  { key: DirectionalHint.leftCenter, text: 'Left Center' },
  { key: DirectionalHint.leftBottomEdge, text: 'Left Bottom Edge' },
  { key: DirectionalHint.rightTopEdge, text: 'Right Top Edge' },
  { key: DirectionalHint.rightCenter, text: 'Right Center' },
  { key: DirectionalHint.rightBottomEdge, text: 'Right Bottom Edge' },
];

const checkboxStyles: Partial<ICheckboxStyles> = { root: { margin: '10px 0' } };

export const ContextualMenuDirectionalExample: React.FunctionComponent = () => {
  const [isBeakVisible, setIsBeakVisible] = React.useState(false);
  const [useDirectionalHintForRTL, setUseDirectionalHintForRTL] = React.useState(false);
  const [directionalHint, setDirectionalHint] = React.useState<DirectionalHint>(DirectionalHint.bottomLeftEdge);
  const [directionalHintForRTL, setDirectionalHintForRTL] = React.useState<DirectionalHint>(
    DirectionalHint.bottomLeftEdge,
  );

  const onShowBeakChange = useConstCallback((event: React.FormEvent<HTMLElement>, isVisible: boolean): void => {
    setIsBeakVisible(isVisible);
  });

  const onUseRtlHintChange = useConstCallback((event: React.FormEvent<HTMLElement>, isVisible: boolean): void => {
    setUseDirectionalHintForRTL(isVisible);
  });

  const onDirectionalChanged = useConstCallback(
    (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
      setDirectionalHint(option.key as DirectionalHint);
    },
  );

  const onDirectionalRtlChanged = useConstCallback(
    (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
      setDirectionalHintForRTL(option.key as DirectionalHint);
    },
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
    [isBeakVisible, directionalHint, directionalHintForRTL],
  );

  return (
    <div className="ms-ContextualMenuDirectionalExample">
      <div className="ms-ContextualMenuDirectionalExample-configArea">
        <Checkbox styles={checkboxStyles} label="Show beak" checked={isBeakVisible} onChange={onShowBeakChange} />
        <Dropdown
          label="Directional hint"
          selectedKey={directionalHint!}
          options={DIRECTION_OPTIONS}
          onChange={onDirectionalChanged}
        />
        {getRTL() && (
          <Checkbox label="Use RTL directional hint" checked={useDirectionalHintForRTL} onChange={onUseRtlHintChange} />
        )}
        {getRTL() && (
          <Dropdown
            label="Directional hint for RTL"
            selectedKey={directionalHintForRTL!}
            options={DIRECTION_OPTIONS}
            onChange={onDirectionalRtlChanged}
            disabled={!useDirectionalHintForRTL}
          />
        )}
      </div>
      <div className="ms-ContextualMenuDirectionalExample-buttonArea">
        <DefaultButton text="Show context menu" menuProps={menuProps} />
      </div>
    </div>
  );
};

const menuItems: IContextualMenuItem[] = [
  {
    key: 'newItem',
    text: 'New',
  },
  {
    key: 'divider_1',
    itemType: ContextualMenuItemType.Divider,
  },
  {
    key: 'rename',
    text: 'Rename',
  },
  {
    key: 'edit',
    text: 'Edit',
  },
  {
    key: 'properties',
    text: 'Properties',
  },
  {
    key: 'disabled',
    text: 'Disabled item',
    disabled: true,
  },
];
