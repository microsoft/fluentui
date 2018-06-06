import { ICollapsibleSectionProps, ICollapsibleSectionStyles } from './CollapsibleSection.types';
import { ITheme } from 'office-ui-fabric-react';

export const getStyles = (props: ICollapsibleSectionProps & { theme: ITheme }): ICollapsibleSectionStyles => {
  const { theme } = props;

  return {
    body: [
      {
        paddingLeft: 30
      },
      theme.fonts.small
    ]
  };
};
