import * as React from 'react';
import { Steps } from 'storywright';
import {
  DocumentCard,
  DocumentCardPreview,
  DocumentCardTitle,
  DocumentCardActivity,
  Fabric,
} from '@fluentui/react';
import { TestImages } from '@fluentui/example-data';

import { StoryWrightDecorator, TestWrapperDecorator } from '../../utilities';
import { previewProps } from './utilts';

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
