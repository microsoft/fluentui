import * as React from 'react';
import { DemoPage } from '../DemoPage';
import { ChoiceGroupPageProps } from '@fluentui/react-examples/lib/react/ChoiceGroup/ChoiceGroup.doc';

export const ChoiceGroupPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@fluentui/api-docs/lib/pages/react/ChoiceGroup.page.json')}
    {...{ ...ChoiceGroupPageProps, ...props }}
  />
);
