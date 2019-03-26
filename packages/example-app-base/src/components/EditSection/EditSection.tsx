import * as React from 'react';
import { IEditSectionProps } from './EditSection.types';
import { IconButton, TooltipHost } from 'office-ui-fabric-react';

const readableNameMap: { [key: string]: string } = {
  BestPractices: 'Best Practices',
  Donts: "Don'ts"
};

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

    const readableSection = this.props.readableSection || readableNameMap[section] || section;
    const tooltipHostId = `${title}-${section}-editButtonHost`;

    return (
      <TooltipHost
        key={`${title}-${section}-editButton`}
        content={`Edit ${title} ${readableSection}`}
        id={tooltipHostId}
        hostClassName={className}
      >
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
