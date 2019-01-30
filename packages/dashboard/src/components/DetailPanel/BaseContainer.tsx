import * as React from 'react';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { IDetailPanelBaseCommonAction, IBaseContainerProps } from './DetailPanel.types';
import { MessageBanner } from './Body/MessageBanner';
import { ActionBar } from './Footer/ActionBar';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Header } from './Header/index';
import { detailPanelBaseStyles } from './DetailPanel.styles';
import { AnimationClassNames, mergeStyles } from 'office-ui-fabric-react/lib/Styling';

type BodyContainerType = IBaseContainerProps & IDetailPanelBaseCommonAction;

const baseContainer: React.SFC<BodyContainerType> = (props: BodyContainerType) => {
  const css = detailPanelBaseStyles;
  const _shouldHideOnLoading = () => {
    const { loadingElement, inlineLoading } = props;
    return loadingElement && !inlineLoading;
  };

  const _renderNav = () => {
    const { onBack, onDismiss, onRefresh } = props;
    return (
      <div className={css.navBar}>
        <div className={css.navLeft}>
          {onBack && !_shouldHideOnLoading() && <IconButton iconProps={{ iconName: 'Back' }} onClick={onBack} />}
        </div>
        <div className={css.navRight}>
          {onRefresh && !_shouldHideOnLoading() && <IconButton iconProps={{ iconName: 'Refresh' }} onClick={onRefresh} />}
          <IconButton iconProps={{ iconName: 'ChromeClose' }} onClick={onDismiss} />
        </div>
      </div>
    );
  };

  const _renderHeader = () => {
    if (_shouldHideOnLoading()) {
      return null;
    }
    const { header } = props;
    if (header) {
      return (
        <div className={css.header}>
          <Header {...header} />
        </div>
      );
    }
    return null;
  };

  const _renderMessageBanner = () => {
    const { messageBanner } = props;
    if (messageBanner) {
      return (
        <div className={css.messageBar}>
          <MessageBanner {...messageBanner} />
        </div>
      );
    }
    return null;
  };

  const _renderFooter = () => {
    if (_shouldHideOnLoading()) {
      return null;
    }

    const { actionBar, onSetMessageBanner, onSetLoadingAnimation, onSetActionBar, onSetConfirmationResult } = props;

    if (actionBar) {
      return (
        <div className={css.footer}>
          <ActionBar
            {...actionBar}
            onSetLoadingAnimation={onSetLoadingAnimation}
            onSetMessageBanner={onSetMessageBanner}
            onSetActionBar={onSetActionBar}
            onSetConfirmationResult={onSetConfirmationResult}
          />
        </div>
      );
    }
    return null;
  };

  const _renderBody = () => {
    const { mainContent } = props;
    return <div className={css.content}>{mainContent}</div>;
  };

  const _renderElement = () => {
    const { loadingElement, inlineLoading, isOpen, type, customWidth, isBlocking, isLightDismiss, onLightDismiss, customStyle } = props;

    const animation = isOpen ? AnimationClassNames.slideLeftIn400 : AnimationClassNames.slideRightOut400;
    const customClassName = mergeStyles(animation, customStyle);
    return (
      <Panel
        className={customClassName}
        isOpen={isOpen}
        type={customWidth ? PanelType.custom : type}
        customWidth={customWidth}
        isBlocking={isBlocking}
        isLightDismiss={isLightDismiss}
        onLightDismissClick={onLightDismiss}
        onRenderNavigation={_renderNav}
        onRenderHeader={_renderHeader}
        isFooterAtBottom={true}
        onRenderFooterContent={_renderFooter}
      >
        <div className={css.content}>{loadingElement}</div>
        {(!loadingElement || (loadingElement && inlineLoading)) && (
          <>
            {_renderMessageBanner()}
            {_renderBody()}
          </>
        )}
      </Panel>
    );
  };

  return _renderElement();
};

baseContainer.defaultProps = {
  isOpen: true,
  type: PanelType.medium,
  isBlocking: true,
  isLightDismiss: false
};

export { baseContainer as BaseContainer, BodyContainerType };
