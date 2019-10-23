import { TeachingBannerView } from './TeachingBanner.view';
import { TeachingBannerStyles, TeachingBannerTokens } from './TeachingBanner.styles';
import { useTeachingBannerState } from './TeachingBanner.state';
import { ITeachingBannerProps } from './TeachingBanner.types';
import { createComponent } from '../../Foundation';

/**
 * {@docCategory TeachingBanner}
 */
export const TeachingBanner: React.StatelessComponent<ITeachingBannerProps> = createComponent(TeachingBannerView, {
  displayName: 'TeachingBanner',
  state: useTeachingBannerState,
  styles: TeachingBannerStyles,
  tokens: TeachingBannerTokens
});
