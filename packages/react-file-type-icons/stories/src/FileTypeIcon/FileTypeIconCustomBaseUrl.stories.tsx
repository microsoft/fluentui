import * as React from 'react';
import type { Meta } from '@storybook/react';
import { FileIconType, FileTypeIcon } from '@fluentui/react-file-type-icons';

export default {
  title: 'Compat Components/FileTypeIcon',
  component: FileTypeIcon,
} satisfies Meta<typeof FileTypeIcon>;

export const CustomBaseUrl = () => (
  <div>
    <FileTypeIcon
      extension="docx"
      size={24}
      baseUrl="https://res.cdn.office.net/files/fabric-cdn-prod_20250805.001/assets/item-types/"
    />
    <FileTypeIcon
      type={FileIconType.folder}
      size={24}
      baseUrl="https://res.cdn.office.net/files/fabric-cdn-prod_20250805.001/assets/item-types/"
    />
  </div>
);
