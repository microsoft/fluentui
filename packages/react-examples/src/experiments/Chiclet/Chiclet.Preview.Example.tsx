import * as React from 'react';
import { Chiclet, ChicletSize } from '@uifabric/experiments/lib/Chiclet';

const SAMPLE_URL = 'https://contoso.sharepoint.com';

export const ChicletPreviewExample: React.FunctionComponent<{}> = () => {
  const Preview: React.FunctionComponent<{}> = props => {
    return <img src="http://placehold.it/100x100" {...props} />;
  };

  return (
    <Chiclet
      url={SAMPLE_URL}
      title={'WordTest with a really long title that will wrap around to the second line.docx'}
      size={ChicletSize.medium}
      preview={<Preview />}
    />
  );
};
