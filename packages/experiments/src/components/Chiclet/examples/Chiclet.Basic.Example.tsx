import * as React from 'react';
import { Chiclet, ChicletSize } from '@uifabric/experiments/lib/Chiclet';

const SAMPLE_URL = 'https://contoom';

export const ChicletBasicExample: React.FunctionComponent<{}> = () => {
  return (
    <Chiclet
      url={SAMPLE_URL}
      title={'WordTest with a really long title that will wrap around to the second line.docx'}
      image="https://avatars1.githubusercontent.com/u/42977041?s=460&v=4"
      itemType="docx"
      size={ChicletSize.medium}
    />
  );
};
