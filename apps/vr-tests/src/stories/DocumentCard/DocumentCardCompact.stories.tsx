import * as React from 'react';
import { Steps } from 'storywright';
import {
  DocumentCard,
  DocumentCardPreview,
  DocumentCardTitle,
  DocumentCardActivity,
  DocumentCardType,
  DocumentCardDetails,
  Fabric,
  IDocumentCardPreviewProps,
} from '@fluentui/react';
import { TestImages } from '@fluentui/example-data';

import { StoryWrightDecorator, TestWrapperDecoratorFullWidth } from '../../utilities';
import { previewProps } from './utilts';

const previewPropsCompact: IDocumentCardPreviewProps = {
  getOverflowDocumentCountText: (overflowCount: number) => `+${overflowCount} more`,
  previewImages: [
    {
      name: 'Revenue stream proposal fiscal year 2016 version02.pptx',
      linkProps: {
        href: 'http://bing.com',
      },
      previewImageSrc: TestImages.documentPreview,
      iconSrc: TestImages.iconPpt,
      width: 144,
    },
    {
      name: 'New Contoso Collaboration for Conference Presentation Draft',
      linkProps: {
        href: 'http://bing.com',
      },
      previewImageSrc: TestImages.documentPreviewTwo,
      iconSrc: TestImages.iconPpt,
      width: 144,
    },
    {
      name: 'Spec Sheet for design',
      linkProps: {
        href: 'http://bing.com',
      },
      previewImageSrc: TestImages.documentPreviewThree,
      iconSrc: TestImages.iconPpt,
      width: 144,
    },
    {
      name: 'Contoso Marketing Presentation',
      linkProps: {
        href: 'http://bing.com',
      },
      previewImageSrc: TestImages.documentPreview,
      iconSrc: TestImages.iconPpt,
      width: 144,
    },
  ],
};

const docActivity = (
  <Fabric>
    <DocumentCardActivity
      activity="Created a few minutes ago"
      people={[{ name: 'Annie Lindqvist', profileImageSrc: TestImages.personaFemale }]}
    />
  </Fabric>
);

export default {
  title: 'DocumentCard',

  decorators: [
    TestWrapperDecoratorFullWidth,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()),
  ],
};

export const CompactWithPreviewList = () => (
  <Fabric>
    <DocumentCard type={DocumentCardType.compact} onClickHref="http://bing.com">
      <DocumentCardPreview {...previewPropsCompact} />
      <DocumentCardDetails>
        <DocumentCardTitle title="4 files were uploaded" shouldTruncate={true} />
        {docActivity}
      </DocumentCardDetails>
    </DocumentCard>
  </Fabric>
);

CompactWithPreviewList.storyName = 'Compact with preview list';

export const CompactWithPreviewImage = () => (
  <Fabric>
    <DocumentCard type={DocumentCardType.compact} onClickHref="http://bing.com">
      <DocumentCardPreview previewImages={[previewProps.previewImages[0]]} />
      <DocumentCardDetails>
        <DocumentCardTitle
          title="Revenue stream proposal fiscal year 2016 version02.pptx"
          shouldTruncate={true}
        />
        {docActivity}
      </DocumentCardDetails>
    </DocumentCard>
  </Fabric>
);

CompactWithPreviewImage.storyName = 'Compact with preview image';
