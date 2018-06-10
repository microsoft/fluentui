import { EditSection } from './EditSection';

export enum ComponentPageSection {
  BestPractices,
  Donts,
  Dos,
  Overview,
}

export interface IEditSection {

}

export interface IEditSectionProps extends React.HTMLAttributes<EditSection> {
  /**
   * Optional callback to access the IPersona interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IEditSection | null) => void;

  /**
   * The name of the Component
   */
  title: string;

  /**
   * The section of the page.
   */
  section: ComponentPageSection;

  /**
   * Pass the prop that has the content of the section.
   * This checks if the content is a function before showing
   * the EditSection button.
   */
  sectionContent: JSX.Element;

  /**
   * Override for section name.
   */
  readableSection?: string;

  /**
   * Url for the edit button.
   */
  url: string;
}