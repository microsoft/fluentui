import * as React from 'react';
import { Chiclet, ChicletSize } from '@fluentui/react-experiments/lib/Chiclet';

const SAMPLE_URL = 'https://contoso.sharepoint.com';

export const ChicletPreviewExample: React.FunctionComponent<{}> = () => {
  const Preview: React.FunctionComponent<{}> = props => {
    return (
      <img
        src="https://res.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/fluent-placeholder.svg"
        {...props}
        height={100}
        width={100}
      />
    );
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
