/** @jsx withSlots */
import { withSlots, getSlots, ThemeProvider } from '../../Foundation';
import { ITeachingBannerComponent, ITeachingBannerProps, ITeachingBannerSlots } from './TeachingBanner.types';
import { FontIcon } from '../../utilities/factoryComponents';
import { Stack, DefaultButton, PrimaryButton, IconButton, Text } from 'office-ui-fabric-react';

/**
 * {@docCategory TeachingBanner}
 */
export const TeachingBannerView: ITeachingBannerComponent['view'] = props => {
  const Slots = getSlots<ITeachingBannerProps, ITeachingBannerSlots>(props, {
    root: 'div',
    iconPremium: FontIcon,
    content: 'div',
    headline: Text,
    actionsContainer: Stack,
    actionPrimaryButton: PrimaryButton,
    actionDefaultButton: DefaultButton,
    dismissButton: IconButton
  });

  if (props.dismissed) {
    return null;
  }
  const { actions, children, premium, headline, onDismiss, scheme = 'strong' } = props;

  return (
    <ThemeProvider scheme={scheme}>
      <Slots.root>
        {premium && <Slots.iconPremium />}
        <Slots.content>
          {headline && <Slots.headline as="strong" />}
          {children}
          {actions && (
            <Slots.actionsContainer horizontal>
              {actions.map(itemProps =>
                itemProps.primary ? <Slots.actionPrimaryButton {...itemProps} /> : <Slots.actionDefaultButton {...itemProps} />
              )}
            </Slots.actionsContainer>
          )}
        </Slots.content>
        {onDismiss && <Slots.dismissButton iconProps={{ iconName: 'Cancel' }} onClick={onDismiss} />}
      </Slots.root>
    </ThemeProvider>
  );
};
