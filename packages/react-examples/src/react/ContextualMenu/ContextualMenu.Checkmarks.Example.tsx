import * as React from 'react';
import {
  ContextualMenuItemType,
  DirectionalHint,
  IContextualMenuItem,
  IContextualMenuProps,
} from '@fluentui/react/lib/ContextualMenu';
import { DefaultButton } from '@fluentui/react/lib/Button';

const keys: string[] = [
  'newItem',
  'share',
  'mobile',
  'enablePrint',
  'enableMusic',
  'newSub',
  'emailMessage',
  'calendarEvent',
  'disabledNewSub',
  'disabledEmailMessage',
  'disabledCalendarEvent',
  'splitButtonSubMenuLeftDirection',
  'emailMessageLeft',
  'calendarEventLeft',
  'disabledPrimarySplit',
];

export const ContextualMenuCheckmarksExample: React.FunctionComponent = () => {
  const [selection, setSelection] = React.useState<{ [key: string]: boolean }>({});

  const onToggleSelect = React.useCallback(
    (ev?: React.MouseEvent<HTMLButtonElement>, item?: IContextualMenuItem): void => {
      ev && ev.preventDefault();

      if (item) {
        setSelection({ ...selection, [item.key]: selection[item.key] === undefined ? true : !selection[item.key] });
      }
    },
    [selection],
  );

  const menuProps: IContextualMenuProps = React.useMemo(
    () => ({
      shouldFocusOnMount: true,
      items: [
        { key: keys[0], text: 'New', canCheck: true, isChecked: selection[keys[0]], onClick: onToggleSelect },
        { key: keys[1], text: 'Share', canCheck: true, isChecked: selection[keys[1]], onClick: onToggleSelect },
        { key: keys[2], text: 'Mobile', canCheck: true, isChecked: selection[keys[2]], onClick: onToggleSelect },
        { key: 'divider_1', itemType: ContextualMenuItemType.Divider },
        { key: keys[3], text: 'Print', canCheck: true, isChecked: selection[keys[3]], onClick: onToggleSelect },
        { key: keys[4], text: 'Music', canCheck: true, isChecked: selection[keys[4]], onClick: onToggleSelect },
        {
          key: keys[5],
          iconProps: {
            iconName: 'MusicInCollectionFill',
          },
          subMenuProps: {
            items: [
              {
                key: keys[6],
                text: 'Email message',
                canCheck: true,
                isChecked: selection[keys[6]],
                onClick: onToggleSelect,
              },
              {
                key: keys[7],
                text: 'Calendar event',
                canCheck: true,
                isChecked: selection[keys[7]],
                onClick: onToggleSelect,
              },
            ],
          },
          text: 'Split Button',
          canCheck: true,
          isChecked: selection[keys[5]],
          split: true,
          onClick: onToggleSelect,
        },
        {
          key: keys[8],
          iconProps: {
            iconName: 'MusicInCollectionFill',
          },
          subMenuProps: {
            items: [
              {
                key: keys[9],
                text: 'Email message',
                canCheck: true,
                isChecked: selection[keys[9]],
                onClick: onToggleSelect,
              },
              {
                key: keys[10],
                text: 'Calendar event',
                canCheck: true,
                isChecked: selection[keys[10]],
                onClick: onToggleSelect,
              },
            ],
          },
          text: 'Split Button',
          canCheck: true,
          checked: true,
          isChecked: selection[keys[8]],
          split: true,
          onClick: onToggleSelect,
          disabled: true,
        },
        {
          key: keys[11],
          iconProps: {
            iconName: 'MusicInCollectionFill',
          },
          subMenuProps: {
            directionalHint: DirectionalHint.leftCenter,
            items: [
              {
                key: keys[12],
                text: 'Email message',
                canCheck: true,
                isChecked: selection[keys[12]],
                onClick: onToggleSelect,
              },
              {
                key: keys[13],
                text: 'Calendar event',
                canCheck: true,
                isChecked: selection[keys[13]],
                onClick: onToggleSelect,
              },
            ],
          },
          text: 'Split Button Left Menu',
          canCheck: true,
          isChecked: selection[keys[11]],
          split: true,
          onClick: onToggleSelect,
        },
        {
          key: keys[12],
          iconProps: {
            iconName: 'MusicInCollectionFill',
          },
          subMenuProps: {
            items: [
              {
                key: keys[12],
                name: 'Email message',
                canCheck: true,
                isChecked: selection[keys[12]],
                onClick: onToggleSelect,
              },
            ],
          },
          name: 'Split Button Disabled Primary',
          split: true,
          primaryDisabled: true,
        },
        {
          key: keys[13],
          iconProps: {
            iconName: selection[keys[13]] ? 'SingleBookmarkSolid' : 'SingleBookmark',
          },
          name: selection[keys[13]] ? 'Toggled command no checkmark' : 'Toggle command no checkmark',
          canCheck: false,
          isChecked: selection[keys[13]],
          onClick: onToggleSelect,
        },
      ],
    }),
    [selection, onToggleSelect],
  );

  return <DefaultButton text="Click for ContextualMenu" menuProps={menuProps} />;
};
