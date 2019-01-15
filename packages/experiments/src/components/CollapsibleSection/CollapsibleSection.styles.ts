import { ICollapsibleSectionComponent } from './CollapsibleSection.types';
import { getGlobalClassNames } from '../../Styling';

const GlobalClassNames = {
  root: 'ms-CollapsibleSection',
  body: 'ms-CollapsibleSection-body'
};

export const collapsibleSectionStyles: ICollapsibleSectionComponent['styles'] = (props, theme) => {
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [classNames.root, theme.fonts.medium],
    body: [classNames.body]
  };
};
