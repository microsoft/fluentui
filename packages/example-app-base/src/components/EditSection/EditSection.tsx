import * as React from 'react';
import { IEditSectionProps } from './EditSection.types';
import { IconButton, TooltipHost } from 'office-ui-fabric-react';

/**
 * Component for displaying an edit button next to a section header.
 */
export class EditSection extends React.PureComponent<IEditSectionProps> {
  public render() {
    const { className, section, title, url } = this.props;

    // Check if url is falsey.
    if (!url) {
      return null;
    }

    const sectionId = title.replace(/[^\w-]/g, '');
    const tooltipHostId = `${title}-${sectionId}-editButtonHost`;

    return (
      <TooltipHost content={`Edit ${title} ${section}`} id={tooltipHostId} hostClassName={className}>
        <IconButton
          aria-labelledby={tooltipHostId}
          iconProps={{
            iconName: 'Edit'
          }}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        />
      </TooltipHost>
    );
  }
}
