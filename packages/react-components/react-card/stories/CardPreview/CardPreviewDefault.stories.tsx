import * as React from 'react';
import { CardPreview } from '@fluentui/react-card';

const ASSET_URL = 'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card';
const wordLogoURL = ASSET_URL + '/stories/assets/word_logo.svg';
const docTemplateURL = ASSET_URL + '/stories/assets/doc_template.png';

export const Default = () => (
  <CardPreview logo={<img src={wordLogoURL} alt="Microsoft Word logo" />}>
    <img src={docTemplateURL} alt="Preview of a Word document " />
  </CardPreview>
);
