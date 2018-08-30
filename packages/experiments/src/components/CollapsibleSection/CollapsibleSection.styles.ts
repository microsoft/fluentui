import { ICollapsibleSectionStyleProps, ICollapsibleSectionStyles } from './CollapsibleSection.types';
import { getGlobalClassNames } from '../../Styling';

const GlobalClassNames = {
  root: 'ms-CollapsibleSection',
  body: 'ms-CollapsibleSection-body'
};

export function collapsibleSectionStyles(props: ICollapsibleSectionStyleProps): ICollapsibleSectionStyles {
  const { theme } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [classNames.root],
    body: [classNames.body]
  };
}
