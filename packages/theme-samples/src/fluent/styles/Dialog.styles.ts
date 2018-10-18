import { FontSizes } from '../FluentType';
import { FontWeights } from 'office-ui-fabric-react/lib/Styling';
import { Depths } from '../FluentDepths';
import { fluentBorderRadius } from './styleConstants';

export const DialogStyles = {
  main: {
    selectors: {
      '.ms-Modal.ms-Dialog &': {
        boxShadow: Depths.depth64,
        borderRadius: fluentBorderRadius
      }
    }
  }
};

export const DialogContentStyles = {
  title: {
    fontSize: FontSizes.size20,
    fontWeight: FontWeights.semibold,
    padding: '16px',
    lineHeight: 'normal'
  },
  topButton: {
    padding: '16px 10px 0 0'
  },
  inner: {
    padding: '0 16px 16px'
  },
  subText: {
    fontWeight: FontWeights.regular
  }
};

export const DialogFooterStyles = {
  actions: {
    margin: '16px 0 0'
  }
};
