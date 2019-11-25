import * as React from 'react';
import {
  DocumentCard,
  DocumentCardActions,
  DocumentCardActivity,
  DocumentCardLocation,
  DocumentCardPreview,
  DocumentCardTitle,
  IDocumentCardPreviewProps
} from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { TestImages } from '@uifabric/example-data';

export class DocumentCardCompleteExample extends React.PureComponent {
  public render(): JSX.Element {
    const previewProps: IDocumentCardPreviewProps = {
      getOverflowDocumentCountText: (overflowCount: number) => `+${overflowCount} more`,
      previewImages: [
        {
          name: '2016 Conference Presentation',
          linkProps: {
            href: 'http://bing.com',
            target: '_blank'
          },
          previewImageSrc: TestImages.documentPreview,
          iconSrc: TestImages.iconPpt,
          imageFit: ImageFit.cover,
          width: 318,
          height: 196
        },
        {
          name: 'New Contoso Collaboration for Conference Presentation Draft',
          linkProps: {
            href: 'http://bing.com',
            target: '_blank'
          },
          previewImageSrc: TestImages.documentPreviewTwo,
          iconSrc: TestImages.iconPpt,
          imageFit: ImageFit.cover,
          width: 318,
          height: 196
        },
        {
          name: 'Spec Sheet for design',
          linkProps: {
            href: 'http://bing.com',
            target: '_blank'
          },
          previewImageSrc: TestImages.documentPreviewThree,
          iconSrc: TestImages.iconPpt,
          imageFit: ImageFit.cover,
          width: 318,
          height: 196
        },
        {
          name: 'Contoso Marketing Presentation',
          linkProps: {
            href: 'http://bing.com',
            target: '_blank'
          },
          previewImageSrc: TestImages.documentPreview,
          iconSrc: TestImages.iconPpt,
          imageFit: ImageFit.cover,
          width: 318,
          height: 196
        },
        {
          name: 'Notes from Ignite conference',
          linkProps: {
            href: 'http://bing.com',
            target: '_blank'
          },
          previewImageSrc: TestImages.documentPreviewTwo,
          iconSrc: TestImages.iconPpt,
          imageFit: ImageFit.cover,
          width: 318,
          height: 196
        },
        {
          name: 'FY17 Cost Projections',
          linkProps: {
            href: 'http://bing.com',
            target: '_blank'
          },
          previewImageSrc: TestImages.documentPreviewThree,
          iconSrc: TestImages.iconPpt,
          imageFit: ImageFit.cover,
          width: 318,
          height: 196
        }
      ]
    };

    return (
      <DocumentCard
        aria-label="Document Card with multiple items, commands and views. Marketing documents. 6 files were uploaded.
        Created by Annie Lindqvist in February 23, 2016. 432 views."
        onClick={this._onClick}
      >
        <DocumentCardPreview {...previewProps} />
        <DocumentCardLocation
          location="Marketing Documents"
          locationHref="http://microsoft.com"
          ariaLabel="Location, Marketing Documents"
        />
        <DocumentCardTitle title="6 files were uploaded" />
        <DocumentCardActivity
          activity="Created Feb 23, 2016"
          people={[{ name: 'Annie Lindqvist', profileImageSrc: TestImages.personaFemale }]}
        />
        <DocumentCardActions
          actions={[
            {
              iconProps: { iconName: 'Share' },
              onClick: this._onActionClick.bind(this, 'share'),
              ariaLabel: 'share action'
            },
            {
              iconProps: { iconName: 'Pin' },
              onClick: this._onActionClick.bind(this, 'pin'),
              ariaLabel: 'pin action'
            },
            {
              iconProps: { iconName: 'Ringer' },
              onClick: this._onActionClick.bind(this, 'notifications'),
              ariaLabel: 'notifications action'
            }
          ]}
          views={432}
        />
      </DocumentCard>
    );
  }

  private _onActionClick(action: string, ev: React.SyntheticEvent<HTMLElement>): void {
    console.log(`You clicked the ${action} action`);
    ev.stopPropagation();
    ev.preventDefault();
  }

  private _onClick(): void {
    console.log('You clicked the card.');
  }
}
