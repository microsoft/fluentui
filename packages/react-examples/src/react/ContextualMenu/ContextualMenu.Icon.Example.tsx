import * as React from 'react';
import { useConst, useBoolean } from '@fluentui/react-hooks';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Callout } from '@fluentui/react/lib/Callout';
import {
  ContextualMenuItemType,
  IContextualMenuProps,
  IContextualMenuItemProps,
} from '@fluentui/react/lib/ContextualMenu';
import { Icon } from '@fluentui/react/lib/Icon';
import { mergeStyleSets, getTheme } from '@fluentui/react/lib/Styling';

export const ContextualMenuIconExample: React.FunctionComponent = () => {
  const [showCallout, { setTrue: onShowCallout, setFalse: onHideCallout }] = useBoolean(false);

  const menuProps: IContextualMenuProps = useConst({
    shouldFocusOnMount: true,
    items: [
      {
        key: 'openInWord',
        text: 'Open in Word',
        iconProps: {},
        onRenderIcon: (props: IContextualMenuItemProps) => {
          return (
            <span className={classNames.iconContainer}>
              <Icon iconName="WordLogoFill16" className={classNames.logoFillIcon} />
              <Icon iconName="WordLogo16" className={classNames.logoIcon} />
            </span>
          );
        },
      },
      { key: 'newItem', iconProps: { iconName: 'Add' }, text: 'New' },
      {
        key: 'upload',
        onClick: onShowCallout,
        iconProps: { iconName: 'Upload', style: { color: 'salmon' } },
        text: 'Upload (Click for popup)',
        title: 'Upload a file',
      },
      { key: 'divider_1', itemType: ContextualMenuItemType.Divider },
      { key: 'share', iconProps: { iconName: 'Share' }, text: 'Share' },
      { key: 'print', iconProps: { iconName: 'Print' }, text: 'Print' },
      { key: 'music', iconProps: { iconName: 'MusicInCollectionFill' }, text: 'Music' },
    ],
  });

  return (
    <div>
      <DefaultButton text="Click for ContextualMenu" menuProps={menuProps} />
      {showCallout && (
        <Callout setInitialFocus onDismiss={onHideCallout}>
          <DefaultButton onClick={onHideCallout} text="Hello Popup" />
        </Callout>
      )}
    </div>
  );
};

const theme = getTheme();
const classNames = mergeStyleSets({
  iconContainer: {
    position: 'relative',
    margin: '0 4px',
    height: 32,
    width: 14,
  },
  logoIcon: {
    position: 'absolute',
    left: 0,
    right: 0,
    color: theme.palette.themeDarkAlt,
  },
  logoFillIcon: {
    position: 'absolute',
    left: 0,
    right: 0,
    color: theme.palette.white,
  },
});
