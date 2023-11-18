import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { DropdownPageProps } from '@fluentui/react-examples/lib/react/Dropdown/Dropdown.doc';

export const DropdownPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage jsonDocs={require('../../../dist/api/react/Dropdown.page.json')} {...{ ...DropdownPageProps, ...props }} />
);
