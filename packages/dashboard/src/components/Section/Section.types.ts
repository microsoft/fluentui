import { IStyle } from 'office-ui-fabric-react/lib/Styling';

export interface ISectionProps {
  /**
   * Title of the section
   */
  title: string;

  /**
   * String for removing section, pass in only if remove is allowed
   */
  removeTitle?: string;
}

export interface ISectionStyles {
  root: IStyle;
  actions: IStyle;
  actionButton: IStyle;
}
