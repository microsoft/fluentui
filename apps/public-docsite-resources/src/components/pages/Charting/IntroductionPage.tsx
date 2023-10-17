import * as React from 'react';
import { DemoPage } from '../../DemoPage';

import { IntroductionPageProps } from '@fluentui/react-examples/lib/react-charting/Introduction/Introduction.doc';

export const IntroductionPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../../dist/api/react-charting/Introduction.page.json')}
    {...{ ...IntroductionPageProps, ...props }}
  />
);
