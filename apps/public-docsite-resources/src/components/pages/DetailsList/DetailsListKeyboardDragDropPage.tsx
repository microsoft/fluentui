import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListKeyboardAccessibleResizeAndReorderProps } from '@fluentui/react-examples/lib/react/DetailsList/DetailsList.doc';

export const DetailsListKeyboardDragDropPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListKeyboardAccessibleResizeAndReorderProps, ...props }} />
);
