import { styled } from 'office-ui-fabric-react/lib/Utilities';
import { IRecommendationProps, IRecommendationStyles, IRecommendationStyleProps } from './Recommendation.types';
import { RecommendationBannerBase } from './RecommendationBanner.base';
import { getRecommendationBannerStyles } from './Recommendation.styles';

// Create a RecommendationBanner variant which uses these default styles and this styled subcomponent.
export const Recommendation: React.StatelessComponent<IRecommendationProps> = styled<
  IRecommendationProps,
  IRecommendationStyleProps,
  IRecommendationStyles
>(RecommendationBannerBase, getRecommendationBannerStyles);
