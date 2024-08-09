import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';
import { IErrorBoundaryStyleProps, IErrorBoundaryStyles } from './ErrorBoundary.types';

export const getErrorBoundaryStyles = (props: IErrorBoundaryStyleProps): IErrorBoundaryStyles => {
  const { className, width, height } = props;

  return {
    root: [
      {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10px',
      },
      className,
    ],
    dataLoadErrorText: {
      fontSize: FontSizes.size14,
      fontWeight: FontWeights.bold,
      fontFamily: 'Segoe UI',
      textAlign: 'center',
    },
    dataLoadErrorSubText: { fontSize: '12px', fontFamily: 'Segoe UI', textAlign: 'center' },
    errorIconDiv: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' },
    errorIconLightTheme: { fontSize: width ? width * 0.5 : 150, height: height ? height * 0.5 : 150 },
    errorIconDarkTheme: { fontSize: width ? width * 0.5 : 150, height: height ? height * 0.5 : 150, color: 'white' },
  };
};
