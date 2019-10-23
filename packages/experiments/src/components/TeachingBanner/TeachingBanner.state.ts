import { useCallback, useState } from 'react';
import { ITeachingBannerComponent, ITeachingBannerProps, ITeachingBannerViewProps } from './TeachingBanner.types';
import { useControlledState } from '../../Foundation';

/**
 * {@docCategory TeachingBanner}
 */
export const useTeachingBannerState: ITeachingBannerComponent['state'] = (
  props: Readonly<ITeachingBannerProps>
): ITeachingBannerViewProps => {
  const [dismissed, setDismissed] = useState(false);
  const [iconPremium] = useControlledState(props, 'iconPremium', {
    defaultPropName: 'defaultPremiumIcon',
    defaultPropValue: 'Diamond'
  });

  const { onDismiss } = props;

  const _onDismiss = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setDismissed(true);
      onDismiss!(event);
    },
    [dismissed]
  );

  const viewProps: ITeachingBannerViewProps = {
    ...props,
    iconPremium,
    dismissed,
    onDismiss: (onDismiss && _onDismiss) || undefined
  };

  return viewProps;
};
