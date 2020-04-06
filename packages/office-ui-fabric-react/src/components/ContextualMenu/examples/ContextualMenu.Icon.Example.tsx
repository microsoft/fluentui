import * as React from 'react';
import { useConst, useConstCallback } from '@uifabric/react-hooks';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import {
  ContextualMenuItemType,
  IContextualMenuProps,
  IContextualMenuItem,
  IContextualMenuItemProps,
} from 'office-ui-fabric-react/lib/ContextualMenu';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import * as stylesImport from './ContextualMenuExample.scss';

// tslint:disable-next-line:no-any
const styles: any = stylesImport;

export const ContextualMenuIconExample: React.FunctionComponent = () => {
  const [showCallout, setShowCallout] = React.useState(false);

  const onShowCallout = useConstCallback(() => setShowCallout(true));
  const onHideCallout = useConstCallback(() => setShowCallout(false));

  const menuItems: IContextualMenuItem[] = useConst([
    {
      key: 'openInWord',
      text: 'Open in Word',
      onRenderIcon: (props: IContextualMenuItemProps) => {
        return (
          <span className={styles.iconContainer}>
            <Icon iconName={'WordLogoFill16'} className={styles.logoFillIcon} />
            <Icon iconName={'WordLogo16'} className={styles.logoIcon} />
          </span>
        );
      },
    },
    {
      key: 'newItem',
      iconProps: {
        iconName: 'Add',
      },
      text: 'New',
    },
    {
      key: 'upload',
      onClick: onShowCallout,
      iconProps: {
        iconName: 'Upload',
        style: {
          color: 'salmon',
        },
      },
      text: 'Upload (Click for popup)',
      title: 'Upload a file',
    },
    {
      key: 'divider_1',
      itemType: ContextualMenuItemType.Divider,
    },
    {
      key: 'share',
      iconProps: {
        iconName: 'Share',
      },
      text: 'Share',
    },
    {
      key: 'print',
      iconProps: {
        iconName: 'Print',
      },
      text: 'Print',
    },
    {
      key: 'music',
      iconProps: {
        iconName: 'MusicInCollectionFill',
      },
      text: 'Music',
    },
  ]);

  const menuProps: IContextualMenuProps = useConst({
    shouldFocusOnMount: true,
    items: menuItems,
  });

  return (
    <div>
      <DefaultButton text="Click for ContextualMenu" menuProps={menuProps} />
      {showCallout && (
        <Callout setInitialFocus={true} onDismiss={onHideCallout}>
          <DefaultButton onClick={onHideCallout} text="Hello Popup" />
        </Callout>
      )}
    </div>
  );
};
