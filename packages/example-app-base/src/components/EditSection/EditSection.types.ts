import * as React from 'react';
import { EditSection } from './EditSection';
import { IRefObject } from 'office-ui-fabric-react/lib/Utilities';

export interface IEditSection {}

export interface IEditSectionProps extends React.HTMLAttributes<EditSection> {
  /** @deprecated Not used */
  componentRef?: IRefObject<IEditSection>;

  /** Optional className for the root element. */
  className?: string;

  /**
   * The name of the component
   */
  title: string;

  /**
   * The section name this button is used to edit.
   */
  section: string;

  /** @deprecated Not used */
  sectionContent?: React.ReactNode;

  /** @deprecated Not used */
  readableSection?: string;

  /**
   * Link to edit the markdown page on GitHub.
   */
  url: string;
}
