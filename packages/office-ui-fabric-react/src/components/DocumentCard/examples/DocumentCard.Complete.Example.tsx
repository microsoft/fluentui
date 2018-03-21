import * as React from 'react';
import {
  DocumentCard,
  DocumentCardActions,
  DocumentCardActivity,
  DocumentCardLocation,
  DocumentCardPreview,
  DocumentCardTitle,
  DocumentCardLogo,
  DocumentCardStatus,
  IDocumentCardPreviewProps,
  IDocumentCardLogoProps
} from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { TestImages } from '../../../common/TestImages';

export class DocumentCardCompleteExample extends React.Component<any, any> {
  public render() {
    const previewProps: IDocumentCardPreviewProps = {
      getOverflowDocumentCountText: (overflowCount: number) => `+${overflowCount} more`,
      previewImages: [
        {
          name: '2016 Conference Presentation',
          url: 'http://bing.com',
          previewImageSrc: TestImages.documentPreview,
          iconSrc: TestImages.iconPpt,
          imageFit: ImageFit.cover,
          width: 318,
          height: 196
        },
        {
          name: 'New Contoso Collaboration for Conference Presentation Draft',
          url: 'http://bing.com',
          previewImageSrc: TestImages.documentPreviewTwo,
          iconSrc: TestImages.iconPpt,
          imageFit: ImageFit.cover,
          width: 318,
          height: 196
        },
        {
          name: 'Spec Sheet for design',
          url: 'http://bing.com',
          previewImageSrc: TestImages.documentPreviewThree,
          iconSrc: TestImages.iconPpt,
          imageFit: ImageFit.cover,
          width: 318,
          height: 196
        },
        {
          name: 'Contoso Marketing Presentation',
          url: 'http://bing.com',
          previewImageSrc: TestImages.documentPreview,
          iconSrc: TestImages.iconPpt,
          imageFit: ImageFit.cover,
          width: 318,
          height: 196
        },
        {
          name: 'Notes from Ignite conference',
          url: 'http://bing.com',
          previewImageSrc: TestImages.documentPreviewTwo,
          iconSrc: TestImages.iconPpt,
          imageFit: ImageFit.cover,
          width: 318,
          height: 196
        },
        {
          name: 'FY17 Cost Projections',
          url: 'http://bing.com',
          previewImageSrc: TestImages.documentPreviewThree,
          iconSrc: TestImages.iconPpt,
          imageFit: ImageFit.cover,
          width: 318,
          height: 196
        }
      ],

    };

    const previewPropsUsingIcon: IDocumentCardPreviewProps = {
      previewImages: [
        {
          previewIconProps: { iconName: 'OpenFile', styles: { root: { fontSize: 42, color: '#ffffff' } } },
          width: 318,
          height: 196
        }
      ]
    };

    const logoProps: IDocumentCardLogoProps = {
      logoIcon: 'OutlookLogo'
    };

    return (
      <div>
        <DocumentCard
          onClick={ this._onClick }
        >
          <DocumentCardPreview { ...previewProps } />
          <DocumentCardLocation location='Marketing Documents' locationHref='http://microsoft.com' ariaLabel='Location, Marketing Documents' />
          <DocumentCardTitle title='6 files were uploaded' />
          <DocumentCardActivity
            activity='Created Feb 23, 2016'
            people={
              [
                { name: 'Annie Lindqvist', profileImageSrc: TestImages.personaFemale },
                { name: 'Roko Kolar', profileImageSrc: '', initials: 'JH' },
                { name: 'Greta Lundberg', profileImageSrc: TestImages.personaFemale }
              ]
            }
          />
          <DocumentCardActions
            actions={
              [
                {
                  iconProps: { iconName: 'Share' },
                  onClick: (ev: any) => {
                    console.log('You clicked the share action.');
                    ev.preventDefault();
                    ev.stopPropagation();
                  },
                  ariaLabel: 'share action'
                },
                {
                  iconProps: { iconName: 'Pin' },
                  onClick: (ev: any) => {
                    console.log('You clicked the pin action.');
                    ev.preventDefault();
                    ev.stopPropagation();
                  },
                  ariaLabel: 'pin action'
                },
                {
                  iconProps: { iconName: 'Ringer' },
                  onClick: (ev: any) => {
                    console.log('You clicked the ringer action.');
                    ev.preventDefault();
                    ev.stopPropagation();
                  },
                  ariaLabel: 'ringer action'
                },
              ]
            }
            views={ 432 }
          />
        </DocumentCard>
        <p />Card Logo, Text Preview CardStatus are used on below examples.<p />
        <DocumentCard onClickHref='http://bing.com'>
          <DocumentCardLogo { ...logoProps } />
          <div className='ms-ConversationTile-TitlePreviewArea' >
            <DocumentCardTitle title='Conversation about anual report a very long long name, Title should be truncated on the long name.' shouldTruncate={ true } />
            <DocumentCardTitle title='This is the email content preview, please feel free to give feedback. SharePoint Site Acitivity add conversation card! This is the last.' shouldTruncate={ true } showAsSecondaryTitle={ true } />
            <DocumentCardStatus statusIcon='attach' status=' 3 Attachments' />
          </div>
          <DocumentCardActivity
            activity='Sent March 13, 2018'
            people={
              [
                { name: 'Annie Lindqvist', profileImageSrc: TestImages.personaFemale },
                { name: 'Roko Kolar', profileImageSrc: '', initials: 'JH' },
                { name: 'Greta Lundberg', profileImageSrc: TestImages.personaFemale }
              ]
            }
          />
        </DocumentCard>
        <p />
        <DocumentCard onClickHref='http://bing.com'>
          <DocumentCardLogo { ...logoProps } />
          <div className='ms-ConversationTile-TitlePreviewArea' >
            <DocumentCardTitle title='Conversation about anual Report' />
            <DocumentCardTitle title='This is the email content preview, help.' showAsSecondaryTitle={ true } />
            <DocumentCardStatus statusIcon='attach' status=' 3 Attachments' />
          </div>
          <DocumentCardActivity
            activity='Sent March 13, 2018'
            people={
              [
                { name: 'Annie Lindqvist', profileImageSrc: TestImages.personaFemale },
                { name: 'Roko Kolar', profileImageSrc: '', initials: 'JH' },
                { name: 'Greta Lundberg', profileImageSrc: TestImages.personaFemale }
              ]
            }
          />
        </DocumentCard>
        <p />
        <DocumentCard onClickHref='http://bing.com'>
          <DocumentCardLogo { ...logoProps } />
          <div className='ms-ConversationTile-TitlePreviewArea' >
            <DocumentCardTitle title='Conversation about anual report' shouldTruncate={ true } />
            <DocumentCardTitle title='This is the email content preview, please feel free to give!' shouldTruncate={ true } showAsSecondaryTitle={ true } />
          </div>
          <DocumentCardActivity
            activity='Sent March 13, 2018'
            people={
              [
                { name: 'Annie Lindqvist', profileImageSrc: TestImages.personaFemale },
                { name: 'Roko Kolar', profileImageSrc: '', initials: 'JH' },
                { name: 'Greta Lundberg', profileImageSrc: TestImages.personaFemale }
              ]
            }
          />
        </DocumentCard>
        <p />
        <DocumentCard onClickHref='http://bing.com'>
          <DocumentCardPreview { ...previewPropsUsingIcon } />
          <div className='ms-DocumentCard-details'>
            <DocumentCardTitle
              title='View and share files'
              shouldTruncate={ true }
            />
            <DocumentCardActivity
              activity='Created a few minutes ago'
              people={
                [
                  { name: 'Kat Larrson', profileImageSrc: TestImages.personaFemale }
                ]
              }
            />
          </div>
        </DocumentCard>
      </div>
    );
  }

  private _onClick(): void {
    console.log('You clicked the card.');
  }

}
