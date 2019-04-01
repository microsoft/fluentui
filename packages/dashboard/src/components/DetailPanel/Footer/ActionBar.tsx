import * as React from 'react';
import {
  FunctionCallback,
  IDetailPanelBaseCommonAction,
  LoadingTheme,
  IDetailPanelErrorResult,
  IDetailPanelActionBarProps,
  IDetailPanelActionResult,
  IDetailPanelAnalytics
} from '../DetailPanel.types';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { withAnalyticsHandler } from '../DetailPanelAnalyticsContext';

type DetailPanelActionBarProps = IDetailPanelActionBarProps & IDetailPanelBaseCommonAction & IDetailPanelAnalytics;

const actionBar: React.SFC<DetailPanelActionBarProps> = (props: DetailPanelActionBarProps) => {
  const _onClickAnalyticsHandler = (onCallBack: () => void, componentType: string, componentProps: {}) => () => {
    const { analyticsHandler } = props;
    if (analyticsHandler) {
      analyticsHandler(componentType, 'click', componentProps);
    }
    onCallBack();
  };

  const _wrapLoadingAnimation = (
    onCallBack: FunctionCallback<IDetailPanelActionResult | void>,
    primary: boolean,
    message?: string,
    inlineSpinner?: boolean
  ) => () => {
    const { onSetLoadingAnimation, onSetMessageBanner, onSetConfirmationResult } = props;
    // Set to loading
    onSetLoadingAnimation!(primary ? LoadingTheme.OnPrimaryButtonClick : LoadingTheme.OnSecondaryButtonClick, message, inlineSpinner);

    // clear message
    onSetMessageBanner!();
    Promise.resolve(onCallBack())
      .then((_: IDetailPanelActionResult) => {
        // Set stop loading
        onSetLoadingAnimation!();

        if (_) {
          if (_.confirmationPage) {
            // Render confirmation page as finale of the detail panel
            onSetConfirmationResult!(_.confirmationPage);
          } else if (_.messageBanner) {
            // set message banner
            onSetMessageBanner!(_.messageBanner);
          }
        }
      })
      .catch((err: IDetailPanelErrorResult) => {
        if (err) {
          // set message banner
          const messageBannerSetting = { ...err.messageBannerSetting };
          if (messageBannerSetting.messageType === undefined) {
            messageBannerSetting.messageType = MessageBarType.error;
          }
          onSetMessageBanner!(messageBannerSetting);
        }

        // set stop loading
        onSetLoadingAnimation!();
      });
  };

  const _renderElement = () => {
    const { primaryButton, secondaryButton, linkButton } = props;
    return (
      <>
        {primaryButton && primaryButton.buttonText && primaryButton.onAction && (
          <PrimaryButton
            onClick={_onClickAnalyticsHandler(
              _wrapLoadingAnimation(primaryButton.onAction, true, primaryButton.onActionMessage, primaryButton.inlineSpinner),
              'primaryButton',
              primaryButton
            )}
          >
            {primaryButton.buttonText}
          </PrimaryButton>
        )}
        {secondaryButton && secondaryButton.buttonText && secondaryButton.onAction && (
          <DefaultButton
            onClick={_onClickAnalyticsHandler(
              _wrapLoadingAnimation(secondaryButton.onAction, false, secondaryButton.onActionMessage, secondaryButton.inlineSpinner),
              'secondaryButton',
              secondaryButton
            )}
          >
            {secondaryButton.buttonText}
          </DefaultButton>
        )}
        {linkButton && linkButton.linkText && (
          <Link
            href={linkButton.linkHref}
            target={linkButton.linkTarget ? linkButton.linkTarget : '_blank'}
            onClick={linkButton.linkAction}
          >
            {linkButton.linkText}
          </Link>
        )}
      </>
    );
  };

  return _renderElement();
};

const ActionBar = withAnalyticsHandler<DetailPanelActionBarProps>(actionBar);

export { ActionBar, DetailPanelActionBarProps };
