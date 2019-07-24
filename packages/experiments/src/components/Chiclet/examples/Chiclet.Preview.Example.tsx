import * as React from 'react';
import { Chiclet, ChicletSize } from '@uifabric/experiments/lib/Chiclet';

const SAMPLE_URL = 'https://contoso.sharepoint.com';

export const ChicletPreviewExample: React.FunctionComponent<{}> = () => {
  const Prev: React.FunctionComponent<{ className: string }> = props => {
    const { className } = props;

    return <img src="https://kbdevstorage1.blob.core.windows.net/asset-blobs/19666_en_1" className={className} />;
  };

  return (
    <Chiclet
      url={SAMPLE_URL}
      title={'WordTest with a really long title that will wrap around to the second line.docx'}
      image="https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/docx_48x1.svg"
      itemType="docx"
      size={ChicletSize.medium}
      preview={Prev}
    />
  );
};
