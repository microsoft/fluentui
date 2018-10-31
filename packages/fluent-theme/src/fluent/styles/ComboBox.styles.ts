import { fluentBorderRadius } from './styleConstants';
import { Depths } from '../FluentDepths';

export const ComboBoxStyles = {
  root: {
    borderRadius: fluentBorderRadius // the bound input box
  },
  callout: {
    borderRadius: `0 0 ${fluentBorderRadius} ${fluentBorderRadius}`,
    overflow: 'hidden',
    boxShadow: Depths.depth8
  }
};
