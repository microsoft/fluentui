/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator, FabricDecoratorFullWidth } from '../utilities';
import {
  DocumentCard,
  DocumentCardPreview,
  DocumentCardTitle,
  DocumentCardActivity,
  DocumentCardType,
  ImageFit,
  DocumentCardDetails,
  Fabric,
  IDocumentCardPreviewProps
} from 'office-ui-fabric-react';

import { TestImages } from '../common/TestImages';

const previewProps: IDocumentCardPreviewProps = {
  previewImages: [
    {
      name: 'Revenue stream proposal fiscal year 2016 version02.pptx',
      linkProps: {
        href: 'http://bing.com'
      },
      previewImageSrc: TestImages.documentPreview,
      iconSrc: TestImages.iconPpt,
      imageFit: ImageFit.cover,
      width: 318,
      height: 196
    }
  ]
};

const previewPropsCompact: IDocumentCardPreviewProps = {
  getOverflowDocumentCountText: (overflowCount: number) => `+${overflowCount} more`,
  previewImages: [
    {
      name: 'Revenue stream proposal fiscal year 2016 version02.pptx',
      linkProps: {
        href: 'http://bing.com'
      },
      previewImageSrc: TestImages.documentPreview,
      iconSrc: TestImages.iconPpt,
      width: 144
    },
    {
      name: 'New Contoso Collaboration for Conference Presentation Draft',
      linkProps: {
        href: 'http://bing.com'
      },
      previewImageSrc: TestImages.documentPreviewTwo,
      iconSrc: TestImages.iconPpt,
      width: 144
    },
    {
      name: 'Spec Sheet for design',
      linkProps: {
        href: 'http://bing.com'
      },
      previewImageSrc: TestImages.documentPreviewThree,
      iconSrc: TestImages.iconPpt,
      width: 144
    },
    {
      name: 'Contoso Marketing Presentation',
      linkProps: {
        href: 'http://bing.com'
      },
      previewImageSrc: TestImages.documentPreview,
      iconSrc: TestImages.iconPpt,
      width: 144
    }
  ]
};

const docActivity = (
  <Fabric>
    <DocumentCardActivity
      activity="Created a few minutes ago"
      people={[{ name: 'Annie Lindqvist', profileImageSrc: TestImages.personaFemale }]}
    />
  </Fabric>
);

storiesOf('DocumentCard', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  )
  .addStory('Root', () => (
    <Fabric>
      <DocumentCard onClickHref="http://bing.com">
        <DocumentCardPreview {...previewProps} />
        <DocumentCardTitle
          title="Large_file_name_with_underscores_used_to_separate_all_of_the_words_and_there_are_so_many_words_it_needs_truncating.pptx"
          shouldTruncate={true}
        />
        {docActivity}
      </DocumentCard>
    </Fabric>
  ))
  .addStory('Not truncated', () => (
    <Fabric>
      <DocumentCard onClickHref="http://bing.com">
        <DocumentCardPreview {...previewProps} />
        <DocumentCardTitle
          title="Large_file_name_with_underscores_used_to_separate_all_of_the_words_and_there_are_so_many_words_it_needs_truncating.pptx"
          shouldTruncate={false}
        />
        {docActivity}
      </DocumentCard>
    </Fabric>
  ))
  .addStory('With secondary title style', () => (
    <Fabric>
      <DocumentCard onClickHref="http://bing.com">
        <DocumentCardPreview {...previewProps} />
        <DocumentCardTitle title="4 files were uploaded" showAsSecondaryTitle={true} />
        {docActivity}
      </DocumentCard>
    </Fabric>
  ));

storiesOf('DocumentCard', module)
  .addDecorator(FabricDecoratorFullWidth)
  .addDecorator(story =>
    // prettier-ignore
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  )
  .addStory('Compact', () => (
    <Fabric>
      <DocumentCard type={DocumentCardType.compact} onClickHref="http://bing.com">
        <DocumentCardPreview {...previewPropsCompact} />
        <DocumentCardDetails>
          <DocumentCardTitle title="4 files were uploaded" shouldTruncate={true} />
          {docActivity}
        </DocumentCardDetails>
      </DocumentCard>
    </Fabric>
  ));
