import * as React from 'react';
import { DemoPage } from '../DemoPage';
import { ChoiceGroupPageProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/ChoiceGroup/ChoiceGroup.doc';

export const ChoiceGroupPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/ChoiceGroup.page.json')}
    {...{ ...ChoiceGroupPageProps, ...props }}
  />
);
