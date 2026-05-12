import * as React from 'react';
import { FileIconType, FileTypeIcon } from '@fluentui/react-file-type-icons';

const customBaseUrl = 'https://res.cdn.office.net/files/fabric-cdn-prod_20260506.001/assets/item-types/';

export const CustomBaseUrl = (): React.ReactElement => (
  <div>
    <FileTypeIcon extension="docx" size={24} baseUrl={customBaseUrl} />
    <FileTypeIcon type={FileIconType.folder} size={24} baseUrl={customBaseUrl} />
  </div>
);
