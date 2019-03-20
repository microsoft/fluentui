import * as React from 'react';
import { IEditSectionProps } from './EditSection.types';
import { IconButton, TooltipHost } from 'office-ui-fabric-react';

export class EditSection extends React.Component<IEditSectionProps, {}> {
  public render(): JSX.Element | null {
    const { className, section, title, url } = this.props;

    // Check if url is falsey.
    if (!url) {
      return null;
    }

    const readableSection = this._getReadableSection();

    return (
      this._shouldRender && (
        <TooltipHost
          key={`${title}-${section}-editButton`}
          content={`Edit ${title} ${readableSection}`}
          id={`${title}-${section}-editButtonHost`}
          hostClassName={className}
        >
          <IconButton
            aria-labelledby={`${title}-${section}-editButtonHost`}
            iconProps={{ iconName: 'Edit' }}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          />
        </TooltipHost>
      )
    );
  }

  private _shouldRender = (): boolean => {
    /** Set sectionContent prop to `any` since sectionContent's type is `React.ReactNode`.
     * `React.ReactNode` can be a string, number, etc, and those don't contain the `type` constructor.
     */
    /* tslint:disable-next-line no-any */
    const sectionContent = this.props.sectionContent as any;

    let shouldRender = true;
    if (sectionContent) {
      // Check if object, eliminating string, number, boolean, etc.
      if (typeof sectionContent === 'object') {
        // Check if typeof type is function, eliminating html and JSX.
        if (typeof sectionContent.type === 'function') {
          // Check if function passed has the name PageMarkdown.
          if (sectionContent.type.displayName !== 'PageMarkdown') {
            shouldRender = false;
          }

          // Also check if the sectionContent has PageMarkdown children.
        } else if (sectionContent.props && sectionContent.props.children) {
          if (
            typeof sectionContent.props.children.type === 'function' &&
            sectionContent.props.children.type.displayName !== 'PageMarkdown'
          ) {
            shouldRender = false;
          } else if (Array.isArray(sectionContent.props.children)) {
            // filter for PageMarkdown displayName as above.
            const contentArray = sectionContent.props.children.filter(
              // tslint:disable-next-line no-any
              (child: any) => child && typeof child.type === 'function' && child.type.displayName === 'PageMarkdown'
            );
            // If none of the children are PageMarkdown.
            if (contentArray.length === 0) {
              shouldRender = false;
            }
          }
        } else {
          shouldRender = false;
        }
      } else {
        shouldRender = false;
      }
    } else {
      shouldRender = false;
    }
    return shouldRender;
  };

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
