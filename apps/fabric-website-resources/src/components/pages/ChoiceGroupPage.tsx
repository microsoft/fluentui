import * as React from 'react';
import { DemoPage } from '../DemoPage';
import { ChoiceGroupPageProps } from 'office-ui-fabric-react/lib/packages/react-fundamentals/components/ChoiceGroup/ChoiceGroup.doc';

export const ChoiceGroupPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/ChoiceGroup.page.json')}
    {...{ ...ChoiceGroupPageProps, ...props }}
  />
);
