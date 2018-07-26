import { createComponent, createComponentWithState } from '../../Foundation';
import { CollapsibleSectionView } from './CollapsibleSection.view';
import { CollapsibleSectionState } from './CollapsibleSection.state';
import { getStyles as styles } from './CollapsibleSection.styles';
import {
  ICollapsibleSectionProps,
  ICollapsibleSectionControlledProps,
  ICollapsibleSectionViewProps,
  ICollapsibleSectionStyles
} from './CollapsibleSection.types';

// TODO: can we use controlled as arg instead of having two distinct types? maybe controlled could be used by createComponent
//          to specify whether or not to use the state component? we could even have default controlled types, like toggle and counter
export const CollapsibleSectionControlled: React.StatelessComponent<
  ICollapsibleSectionControlledProps
> = createComponent<ICollapsibleSectionViewProps, ICollapsibleSectionStyles>({
  displayName: 'CollapsibleSection',
  view: CollapsibleSectionView,
  styles
});

export const CollapsibleSection: React.StatelessComponent<ICollapsibleSectionProps> = createComponentWithState<
  ICollapsibleSectionProps,
  ICollapsibleSectionViewProps,
  ICollapsibleSectionStyles
>(
  {
    displayName: 'CollapsibleSection',
    view: CollapsibleSectionView,
    styles
  },
  CollapsibleSectionState
);
