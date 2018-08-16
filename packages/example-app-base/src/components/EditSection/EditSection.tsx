import * as React from 'react';
import { IEditSectionProps } from './EditSection.types';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';

export class EditSection extends React.Component<IEditSectionProps, {}> {
  public render(): JSX.Element | null {
    const { sectionContent } = this.props;
    const isMarkdown = sectionContent ? typeof sectionContent.type === 'function' : false;
    if (isMarkdown === false) {
      return null;
    }

    const { section, title, url } = this.props;
    const readableSection = this._getReadableSection();

    return (
      <TooltipHost
        key={`${title}-${section}-editButton`}
        content={`Edit ${title} ${readableSection}`}
        id={`${title}-${section}-editButtonHost`}
      >
        <IconButton
          aria-labelledby={`${title}-${section}-editButtonHost`}
          iconProps={{ iconName: 'Edit' }}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        />
      </TooltipHost>
    );
  }

  private _getReadableSection(): string {
    if (this.props.readableSection) {
      return this.props.readableSection;
    }
    const { section } = this.props;
    let readableSection = section;
    switch (section) {
      case 'BestPractices':
        readableSection = 'Best Practices';
        break;
      case 'Donts':
        readableSection = "Don'ts";
        break;
      default:
        readableSection = section;
    }
    return readableSection;
  }
}
