import * as React from 'react';
import { DocumentCardBasicExample } from './examples/DocumentCard.Basic.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { DocumentCardCompleteExample } from './examples/DocumentCard.Complete.Example';
import { DocumentCardCompactExample } from './examples/DocumentCard.Compact.Example';
import { DocumentCardStatus } from './DocumentCard.checklist';

const DocumentCardBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DocumentCard/examples/DocumentCard.Basic.Example.tsx') as string;
const DocumentCardCompleteExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DocumentCard/examples/DocumentCard.Complete.Example.tsx') as string;
const DocumentCardCompactExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DocumentCard/examples/DocumentCard.Compact.Example.tsx') as string;

export const DocumentCardPageProps: IDocPageProps = {
  title: 'DocumentCard',
  componentName: 'DocumentCard',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/DocumentCard',
  componentStatus: DocumentCardStatus,
  examples: [
    {
      title: 'Default DocumentCard',
      code: DocumentCardBasicExampleCode,
      view: (
        <>
          <p>
            The default configuration for a card represents a single file, with space to denote the last significant event and the person
            involved.
          </p>
          <DocumentCardBasicExample />
        </>
      )
    },
    {
      title: 'DocumentCard with multiple items, commands, and views',
      code: DocumentCardCompleteExampleCode,
      view: (
        <>
          <p>
            This example shows a couple of optional abilities, including being able to have a card represent multiple items, being able to
            expose up to three relevant commands, and showing the number of views in the bottom right corner.
          </p>
          <p>Also show a card with Logo, text preview and status that is used for Conversation card.</p>
          <DocumentCardCompleteExample />
        </>
      )
    },
    {
      title: 'DocumentCard with compact layout ',
      code: DocumentCardCompactExampleCode,
      view: (
        <>
          <p>
            When showing a card on a mobile device or a similarly narrow layout, you may choose this Compact layout which helps the filename
            remain scannable while giving roomy space for a preview thumbnail.
          </p>
          <DocumentCardCompactExample />
        </>
      )
    }
  ],
  propertiesTablesSources: [require<string>('!raw-loader!office-ui-fabric-react/src/components/DocumentCard/DocumentCard.types.ts')],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/DocumentCard/docs/DocumentCardOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/DocumentCard/docs/DocumentCardDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/DocumentCard/docs/DocumentCardDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
