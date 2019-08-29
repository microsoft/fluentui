import * as React from 'react';
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardTitle,
  DocumentCardLogo,
  DocumentCardStatus,
  IDocumentCardLogoProps,
  IDocumentCardActivityPerson,
  IDocumentCardStyles
} from 'office-ui-fabric-react/lib/DocumentCard';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { TestImages } from '@uifabric/example-data';

const conversationTileClass = mergeStyles({ height: 182 });

const people: IDocumentCardActivityPerson[] = [
  { name: 'Annie Lindqvist', profileImageSrc: TestImages.personaFemale },
  { name: 'Roko Kolar', profileImageSrc: '', initials: 'RK' },
  { name: 'Aaron Reid', profileImageSrc: TestImages.personaMale },
  { name: 'Christian Bergqvist', profileImageSrc: '', initials: 'CB' },
  { name: 'Greta Lundberg', profileImageSrc: TestImages.personaFemale },
  { name: 'Maor Sharitt', profileImageSrc: TestImages.personaMale },
  { name: 'Velatine Lourvric', profileImageSrc: '', initials: 'VL' },
  { name: 'Kat Larrson', profileImageSrc: TestImages.personaFemale }
];

export const DocumentCardConversationExample: React.StatelessComponent = () => {
  const logoProps: IDocumentCardLogoProps = {
    logoIcon: 'OutlookLogo'
  };

  const cardStyles: IDocumentCardStyles = {
    root: { display: 'inline-block', marginRight: 20, width: 320 }
  };

  return (
    <div>
      <DocumentCard styles={cardStyles} onClickHref="http://bing.com">
        <DocumentCardLogo {...logoProps} />
        <div className={conversationTileClass}>
          <DocumentCardTitle
            title="Conversation about annual report: it has a very very long name which should be truncated."
            shouldTruncate
          />
          <DocumentCardTitle
            title={
              'This is the email content preview which is very very long. The email also has some more content. ' +
              'The content continues. This is the last.'
            }
            shouldTruncate
            showAsSecondaryTitle
          />
          <DocumentCardStatus statusIcon="attach" status="3 Attachments" />
        </div>
        <DocumentCardActivity activity="Sent March 13, 2018" people={people.slice(0, 3)} />
      </DocumentCard>
      <DocumentCard styles={cardStyles} onClickHref="http://bing.com">
        <DocumentCardLogo {...logoProps} />
        <div className={conversationTileClass}>
          <DocumentCardTitle title="Further annual report conversation" />
          <DocumentCardTitle title="Another email content preview." showAsSecondaryTitle />
          <DocumentCardStatus statusIcon="attach" status=" 3 Attachments" />
        </div>
        <DocumentCardActivity activity="Sent March 13, 2018" people={people.slice(3, 6)} />
      </DocumentCard>
      <DocumentCard styles={cardStyles} onClickHref="http://bing.com">
        <DocumentCardLogo {...logoProps} />
        <div className={conversationTileClass}>
          <DocumentCardTitle title="Conversation about annual report" shouldTruncate />
          <DocumentCardTitle title="This is the email content preview. It has a second line." shouldTruncate showAsSecondaryTitle />
        </div>
        <DocumentCardActivity activity="Sent March 13, 2018" people={people.slice(6)} />
      </DocumentCard>
    </div>
  );
};
