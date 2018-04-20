import { getGlobalClassNames } from '../../Styling';
import { IProgressIndicatorStyleProps, IProgressIndicatorStyles } from './ProgressIndicator.types';
import { itemDescription, itemProgress, progressTrack, progressBar } from 'office-ui-fabric-react/lib/components/ProgressIndicator/ProgressIndicator.scss';

const GlobalClassNames = {
  root: 'ms-ProgressIndicator',
  itemName: 'ms-ProgressIndicator-itemName',
  itemDescription: 'ms-ProgressIndicator-itemDescription',
  itemProgress: 'ms-ProgressIndicator-itemProgress',
  progressTrack: 'ms-ProgressIndicator-progressTrack',
  progressBar: 'ms-ProgressIndicator-progressBar',
};

export const getStyles = (
  props: IProgressIndicatorStyleProps
): IProgressIndicatorStyles => {
  const {
    className,
    theme,
  } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return ({
    root: [
      classNames.root,
      {},
      className
    ],

    itemName: [
      classNames.itemName,
      {}
    ],

    itemDescription: [
      classNames.itemDescription,
      {}
    ],

    itemProgress: [
      classNames.itemProgress,
      {}
    ],

    progressTrack: [
      classNames.progressTrack,
      {}
    ],

    progressBar: [
      classNames.progressBar,
      {},
    ],
  });
};