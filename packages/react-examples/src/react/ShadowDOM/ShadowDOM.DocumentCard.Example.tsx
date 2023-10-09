import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { DocumentCardBasicExample } from '../DocumentCard/DocumentCard.Basic.Example';

export const ShadowDOMDocumentCardExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <DocumentCardBasicExample />
    </Shadow>
  );
};
