import * as React from 'react';
import { FileIconType, FileTypeIcon } from '@fluentui/react-file-type-icons';

const customBaseUrl = 'https://my-cdn.example.com/assets/item-types/';

export const CustomBaseUrl = (): React.ReactElement => (
  <div>
    <div>
      <FileTypeIcon extension="docx" size={24} baseUrl={customBaseUrl} /> <span>custom base URL with extension</span>
    </div>
    <div>
      <FileTypeIcon type={FileIconType.folder} size={24} baseUrl={customBaseUrl} />{' '}
      <span>custom base URL with type</span>
    </div>
  </div>
);

CustomBaseUrl.parameters = {
  docs: {
    description: {
      story:
        'Step 6: Use baseUrl only when hosting the exact compatible item-types assets yourself. Keep the asset structure and naming aligned with the resolver expectations.',
    },
  },
};

CustomBaseUrl.storyName = '06 Custom CDN';
