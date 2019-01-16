import * as React from 'react';
import {
  FunctionCallback,
  IDetailPanelBaseSetStatesAction,
  LoadingTheme,
  IDetailPanelErrorResult,
  IDetailPanelActionBarProps,
  IDetailPanelActionResult
} from '../DetailPanel.types';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';



type DetailPanelActionBarProps = IDetailPanelActionBarProps & IDetailPanelBaseSetStatesAction;

const actionBar: React.SFC<DetailPanelActionBarProps> = (props: DetailPanelActionBarProps) => {
  const _wrapLoadingAnimation = (
    onCallBack: FunctionCallback<IDetailPanelActionResult | void>,
    primary: boolean,
    message?: string,
    inlineSpinner?: boolean) => () => {
      const { onSetLoadingAnimation, onSetMessageBanner } = props;
      // Set to loading
      onSetLoadingAnimation(primary ? LoadingTheme.OnPrimaryButtonClick : LoadingTheme.OnSecondaryButtonClick, message, inlineSpinner);

      Promise.resolve(onCallBack()).then((_: IDetailPanelActionResult) => {
        // Set stop loading
        onSetLoadingAnimation();

        if (_) {
          if (_.confirmationPage) {
            // Render confirmation page as finale of the detail panel
          } else if (_.messageBanner) {
            // set message banner
            onSetMessageBanner(_.messageBanner);
          }
        }
      }).catch((err: IDetailPanelErrorResult) => {
        if (err) {
          // set message banner
          onSetMessageBanner(err.messageBannerSetting);
        }

        // set stop loading
        onSetLoadingAnimation();
      })
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
      <div>
        <div>
          {(primaryButtonText && onPrimaryAction) &&
            <PrimaryButton
              onClick={_wrapLoadingAnimation(onPrimaryAction, true, onPrimaryActionMessage, primaryActionInlineSpinner)}
            >
              {primaryButtonText}
            </PrimaryButton>}
        </div>
        <div>
          {(secondaryButtonText && onSecondaryAction) &&
            <DefaultButton
              onClick={_wrapLoadingAnimation(onSecondaryAction, false, onSecondaryActionMessage, secondaryActionInlineSpinner)}
            >
              {secondaryButtonText}
            </DefaultButton>}
        </div>
        <div>
          {linkText &&
            <Link href={linkHref} target={'_blank'} onClick={onLinkAction} >
              {linkText}
            </Link>}
        </div>
      </div>
    )
  };

  return _renderElement();
}

export {
  actionBar as ActionBar
};
