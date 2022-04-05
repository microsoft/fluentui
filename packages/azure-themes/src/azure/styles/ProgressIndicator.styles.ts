import { IProgressIndicatorStyles, IProgressIndicatorStyleProps } from '@fluentui/react/lib/ProgressIndicator';

export const ProgressIndicatorStyles = (props: IProgressIndicatorStyleProps): Partial<IProgressIndicatorStyles> => {
  const { theme } = props;
  const { semanticColors } = theme;

  return {
    progressBar: {
      height: '4px',
    },
    progressTrack: {
      backgroundColor: semanticColors.variantBorder,
      height: '4px',
    },
  };
};
