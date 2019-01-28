import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { CheckboxPageProps } from 'office-ui-fabric-react/lib/components/Checkbox/Checkbox.doc';

export const CheckboxPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage jsonDocs={require('../../../../../common/pages/Checkbox.page.json')} {...{ ...CheckboxPageProps, ...props }} />
);
