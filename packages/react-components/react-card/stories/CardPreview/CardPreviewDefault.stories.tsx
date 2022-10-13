import * as React from 'react';
import { CardPreview } from '../../index';

const ASSET_URL = 'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card';
const wordLogoURL = ASSET_URL + '/assets/word_logo.svg';
const docTemplateURL = ASSET_URL + '/assets/doc_template.png';

export const Default = () => (
  <CardPreview logo={<img src={wordLogoURL} alt="Microsoft Word logo" />}>
    <img src={docTemplateURL} alt="Preview of a Word document " />
  </CardPreview>
);
