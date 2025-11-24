import * as React from 'react';
import { FileTypeIcon } from '@fluentui/file-type-icons-preview';
import type { Meta } from '@storybook/react';

export { Default } from './FileTypeIconDefault.stories';
export { Sizes } from './FileTypeIconSizes.stories';
export { CommonFileTypes } from './FileTypeIconCommon.stories';
export { SpecialTypes } from './FileTypeIconSpecialTypes.stories';
export { UrlAndHtmlFunctions } from './FileTypeIconUrlAndHtml.stories';

import descriptionMd from './FileTypeIconDescription.md';

export default {
  title: 'Preview Components/FileTypeIcon',
  component: FileTypeIcon,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
} as Meta;
