import * as React from 'react';
import { DemoPage } from '../DemoPage';
import { ChoiceGroupPageProps } from 'office-ui-fabric-react/lib/components/ChoiceGroup/ChoiceGroup.doc';

export const ChoiceGroupPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/ChoiceGroup.page.json')}
    {...{ ...ChoiceGroupPageProps, ...props }}
  />
);
