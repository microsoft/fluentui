import * as React from 'react';
import {
  IEditSectionProps,
  ComponentPageSection,
} from './EditSection.types';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';

export class EditSection extends React.Component<IEditSectionProps, {}> {
  public render(): JSX.Element | null {
    const { sectionContent } = this.props;
    const isMarkdown = sectionContent ? typeof sectionContent.type === 'function' : false;
    if (isMarkdown === false) {
      return null;
    }

    const {
      title,
      section: sectionIndex,
      url,
    } = this.props;
    const section = ComponentPageSection[sectionIndex!];
    const readableSection = this._getReadableSection();

    return (
      <TooltipHost
        key={ `${title}-${section}-editButton` }
        content={ `Edit ${title} ${readableSection} on GitHub` }
        id={ `${title}-${section}-editButtonHost` }
      >
        <IconButton
          aria-labelledby={ `${title}-${section}-editButtonHost` }
          iconProps={ { iconName: 'Edit' } }
          href={ url }
          target='_blank'
          rel='noopener noreferrer'
        />
      </TooltipHost>
    );
  }

  private _getReadableSection(): string {
    const {
      section: sectionIndex,
      readableSection: readableSectionProp,
    } = this.props;
    if (readableSectionProp) {
      return readableSectionProp;
    }

    const section = ComponentPageSection[sectionIndex!];
    let readableSection = section;
    switch (sectionIndex) {
      case ComponentPageSection.BestPractices:
        readableSection = 'Best Practices';
        break;
      case ComponentPageSection.Donts:
        readableSection = 'Don\'ts';
        break;
      default:
        readableSection = section;
    }
    return readableSection;
  }
}