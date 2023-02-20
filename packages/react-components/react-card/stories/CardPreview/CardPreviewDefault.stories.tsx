import * as React from 'react';
import { CardPreview } from '@fluentui/react-card';

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/';

  return `${ASSET_URL}${asset}`;
};

export const Default = () => (
  <CardPreview logo={<img src={resolveAsset('word_logo.svg')} alt="Microsoft Word logo" />}>
    <img src={resolveAsset('doc_template.png')} alt="Preview of a Word document " />
  </CardPreview>
);
