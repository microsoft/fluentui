import * as React from 'react';
import { Chiclet, ChicletSize } from '@fluentui/react-experiments';

const SAMPLE_URL = 'https://contoso.sharepoint.com';

export const ChicletXsmallExample: React.FunctionComponent<{}> = () => {
  return (
    <Chiclet
      url={SAMPLE_URL}
      title={'WordTest with a long title that will wrap around.docx'}
      image="https://static2.sharepointonline.com/files/fabric/assets/item-types/48/docx.svg"
      itemType="docx"
      size={ChicletSize.xSmall}
    />
  );
};
