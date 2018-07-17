import { EditSection } from './EditSection';
import { IRefObject } from 'office-ui-fabric-react/lib/Utilities';

export interface IEditSection {}

export interface IEditSectionProps extends React.HTMLAttributes<EditSection> {
  /**
   * Optional callback to access the IPersona interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IEditSection>;

  /**
   * The name of the Component
   */
  title: string;

  /**
   * The section id of the page.
   */
  section: string;

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
