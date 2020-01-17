import * as React from 'react';
import { ContextualMenuItemType, IContextualMenuItem, IContextualMenuItemProps } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import * as stylesImport from './ContextualMenuExample.scss';

// tslint:disable-next-line:no-any
const styles: any = stylesImport;

export const ContextualMenuIconExample: React.FunctionComponent = () => {
  const [showCallout, setShowCallout] = React.useState(false);

  const menuItems: IContextualMenuItem[] = [
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
      }
    },
    {
      key: 'newItem',
      iconProps: {
        iconName: 'Add'
      },
      text: 'New'
    },
    {
      key: 'upload',
      onClick: () => {
        setShowCallout(true);
      },
      iconProps: {
        iconName: 'Upload',
        style: {
          color: 'salmon'
        }
      },
      text: 'Upload (Click for popup)',
      title: 'Upload a file'
    },
    {
      key: 'divider_1',
      itemType: ContextualMenuItemType.Divider
    },
    {
      key: 'share',
      iconProps: {
        iconName: 'Share'
      },
      text: 'Share'
    },
    {
      key: 'print',
      iconProps: {
        iconName: 'Print'
      },
      text: 'Print'
    },
    {
      key: 'music',
      iconProps: {
        iconName: 'MusicInCollectionFill'
      },
      text: 'Music'
    }
  ];

  return (
    <div>
      <DefaultButton
        text="Click for ContextualMenu"
        menuProps={{
          shouldFocusOnMount: true,
          items: menuItems
        }}
      />
      {showCallout && (
        <Callout
          setInitialFocus={true}
          // tslint:disable-next-line:jsx-no-lambda
          onDismiss={() => setShowCallout(false)}
        >
          <DefaultButton
            // tslint:disable-next-line:jsx-no-lambda
            onClick={() => setShowCallout(false)}
            text="Hello Popup"
          />
        </Callout>
      )}
    </div>
  );
};
