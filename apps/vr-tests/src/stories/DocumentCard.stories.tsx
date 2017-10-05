/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import {
  DocumentCard,
  DocumentCardPreview,
  DocumentCardTitle,
  DocumentCardActivity,
  DocumentCardType,
  ImageFit
} from 'office-ui-fabric-react';

import { TestImages } from '../common/TestImages';

let previewProps = {
  previewImages: [
    {
      name: 'Revenue stream proposal fiscal year 2016 version02.pptx',
      url: 'http://bing.com',
      previewImageSrc: TestImages.documentPreview,
      iconSrc: TestImages.iconPpt,
      imageFit: ImageFit.cover,
      width: 318,
      height: 196
    }
  ],
};

let previewPropsCompact = {
  getOverflowDocumentCountText: (overflowCount: number) => `+${overflowCount} more`,
  previewImages: [
    {
      name: 'Revenue stream proposal fiscal year 2016 version02.pptx',
      url: 'http://bing.com',
      previewImageSrc: TestImages.documentPreview,
      iconSrc: TestImages.iconPpt,
      width: 144
    },
    {
      name: 'New Contoso Collaboration for Conference Presentation Draft',
      url: 'http://bing.com',
      previewImageSrc: TestImages.documentPreviewTwo,
      iconSrc: TestImages.iconPpt,
      width: 144
    },
    {
      name: 'Spec Sheet for design',
      url: 'http://bing.com',
      previewImageSrc: TestImages.documentPreviewThree,
      iconSrc: TestImages.iconPpt,
      width: 144
    },
    {
      name: 'Contoso Marketing Presentation',
      url: 'http://bing.com',
      previewImageSrc: TestImages.documentPreview,
      iconSrc: TestImages.iconPpt,
      width: 144
    },
  ],
};

let DocActivity = (
  <DocumentCardActivity
    activity='Created a few minutes ago'
    people={
      [
        { name: 'Annie Lindqvist', profileImageSrc: TestImages.personaFemale }
      ]
    }
  />
);

storiesOf('DocumentCard', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()
      }
    >
      { story() }
    </Screener>
  ))
  .add('Root', () => (
    <DocumentCard onClickHref='http://bing.com'>
      <DocumentCardPreview { ...previewProps } />
      <DocumentCardTitle
        title='Large_file_name_with_underscores_used_to_separate_all_of_the_words_and_there_are_so_many_words_it_needs_truncating.pptx'
        shouldTruncate={ true }
      />
      { DocActivity }
    </DocumentCard>
  ))
  .add('Not truncated', () => (
    <DocumentCard onClickHref='http://bing.com'>
      <DocumentCardPreview { ...previewProps } />
      <DocumentCardTitle
        title='Large_file_name_with_underscores_used_to_separate_all_of_the_words_and_there_are_so_many_words_it_needs_truncating.pptx'
        shouldTruncate={ false }
      />
      { DocActivity }
    </DocumentCard>
  ))
  .add('Compact', () => (
    <DocumentCard type={ DocumentCardType.compact } onClickHref='http://bing.com'>
      <DocumentCardPreview { ...previewPropsCompact } />
      <DocumentCardTitle
        title='4 files were uploaded'
        shouldTruncate={ true }
      />
      { DocActivity }
    </DocumentCard >
  ));