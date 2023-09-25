import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { KeytipsPageProps } from './KeytipsPage.doc';
import { KeytipLayer } from '@fluentui/react/lib/KeytipLayer';

export const KeytipsPage: React.FunctionComponent<IControlsPageProps> = props => {
  return (
    <div>
      <ControlsAreaPage {...props} {...KeytipsPageProps[props.platform!]} />
      <KeytipLayer content="Alt Windows" />
    </div>
  );
};
