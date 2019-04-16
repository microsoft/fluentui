import * as React from 'react';
import { IRefObject } from 'office-ui-fabric-react/lib/Utilities';

/** @deprecated Not used */
export interface IEditSection {}

export interface IEditSectionProps {
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
