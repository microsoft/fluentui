import * as React from 'react';
import { Steps } from 'storywright';
import { StoryWrightDecorator, TestWrapperDecorator } from '../utilities';
import {
  DocumentCard,
  DocumentCardPreview,
  DocumentCardTitle,
  DocumentCardActivity,
  DocumentCardType,
  ImageFit,
  DocumentCardDetails,
  Fabric,
  IDocumentCardPreviewProps,
} from '@fluentui/react';

import { TestImages } from '@fluentui/example-data';

const previewProps: IDocumentCardPreviewProps = {
  previewImages: [
    {
      name: 'Revenue stream proposal fiscal year 2016 version02.pptx',
      linkProps: {
        href: 'http://bing.com',
      },
      previewImageSrc: TestImages.documentPreview,
      iconSrc: TestImages.iconPpt,
      imageFit: ImageFit.cover,
      width: 318,
      height: 196,
    },
  ],
};

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
    TestWrapperDecorator,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()),
  ],
};

export const NotTruncated = () => (
  <Fabric>
    <DocumentCard onClickHref="http://bing.com">
      <DocumentCardPreview {...previewProps} />
      <DocumentCardTitle
        title={
          'Large_file_name_with_underscores_used_to_separate_all_of_the_' +
          'words_and_there_are_so_many_words_it_needs_truncating.pptx'
        }
        shouldTruncate={false}
      />
      {docActivity}
    </DocumentCard>
  </Fabric>
);

NotTruncated.storyName = 'Not truncated';

export const WithSecondaryTitleStyle = () => (
  <Fabric>
    <DocumentCard onClickHref="http://bing.com">
      <DocumentCardPreview {...previewProps} />
      <DocumentCardTitle title="4 files were uploaded" showAsSecondaryTitle={true} />
      {docActivity}
    </DocumentCard>
  </Fabric>
);

WithSecondaryTitleStyle.storyName = 'With secondary title style';

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
CompactWithPreviewList.parameters = {
  testWrapperStyle: { width: '100%' },
};

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
CompactWithPreviewImage.parameters = {
  testWrapperStyle: { width: '100%' },
};
