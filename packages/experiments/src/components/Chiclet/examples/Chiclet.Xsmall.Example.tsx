import * as React from 'react';
import { Chiclet, ChicletSize } from '@uifabric/experiments';
import { Stack } from 'office-ui-fabric-react';

const SAMPLE_URL = 'https://contoso.sharepoint.com';

export class ChicletXsmallExample extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Stack tokens={{ childrenGap: 16 }}>
        <Chiclet
          url={SAMPLE_URL}
          title={'WordTest with a long title that will wrap around to the second line but not the third line'}
          itemType="docx"
          size={ChicletSize.xSmall}
        />
      </Stack>
    );
  }
}
