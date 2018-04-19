import { globalClassNamesWhenEnabled } from '../../Styling';
import { IProgressIndicatorStyleProps, IProgressIndicatorStyles } from './ProgressIndicator.types';

export const getStyles = (
  props: IProgressIndicatorStyleProps
): IProgressIndicatorStyles => {
  const {
    className,
    theme,
  } = props;

  return ({
    root: [
      globalClassNamesWhenEnabled(theme, ['ms-ProgressIndicator']),
      {},
      className
    ],

    itemName: [
      globalClassNamesWhenEnabled(theme, ['ms-ProgressIndicator-itemName']),
      {}
    ],

    itemDescription: [
      globalClassNamesWhenEnabled(theme, ['ms-ProgressIndicator-itemDescription']),
      {}
    ],

    itemProgress: [
      globalClassNamesWhenEnabled(theme, ['ms-ProgressIndicator-itemProgress']),
      {}
    ],

    progressTrack: [
      globalClassNamesWhenEnabled(theme, ['ms-ProgressIndicator-progressTrack']),
      {}
    ],

    progressBar: [
      globalClassNamesWhenEnabled(theme, ['ms-ProgressIndicator-progressBar']),
      {},
    ],
  });
};