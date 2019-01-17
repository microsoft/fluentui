import * as React from 'react';
import {
  FunctionCallback,
  IDetailPanelBaseCommonAction,
  LoadingTheme,
  IDetailPanelErrorResult,
  IDetailPanelActionBarProps,
  IDetailPanelActionResult
} from '../DetailPanel.types';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

type DetailPanelActionBarProps = IDetailPanelActionBarProps & IDetailPanelBaseCommonAction;

const actionBar: React.SFC<DetailPanelActionBarProps> = (props: DetailPanelActionBarProps) => {
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
          const messageBannerSetting = Object.assign({}, err.messageBannerSetting);
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
    const {
      primaryButtonText,
      onPrimaryAction,
      primaryActionInlineSpinner,
      onPrimaryActionMessage,
      secondaryButtonText,
      onSecondaryAction,
      secondaryActionInlineSpinner,
      onSecondaryActionMessage,
      linkHref,
      linkText,
      onLinkAction
    } = props;
    return (
      <>
        {primaryButtonText && onPrimaryAction && (
          <PrimaryButton onClick={_wrapLoadingAnimation(onPrimaryAction, true, onPrimaryActionMessage, primaryActionInlineSpinner)}>
            {primaryButtonText}
          </PrimaryButton>
        )}
        {secondaryButtonText && onSecondaryAction && (
          <DefaultButton
            onClick={_wrapLoadingAnimation(onSecondaryAction, false, onSecondaryActionMessage, secondaryActionInlineSpinner)}
          >
            {secondaryButtonText}
          </DefaultButton>
        )}
        {linkText && (
          <Link href={linkHref} target={'_blank'} onClick={onLinkAction}>
            {linkText}
          </Link>
        )}
      </>
    );
  };

  return _renderElement();
};

export { actionBar as ActionBar };
