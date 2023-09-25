import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DetailsListDragDropPageProps } from './DetailsListDragDropPage.doc';
import { mergeStyles } from '@fluentui/react';

export const DetailsListDragDropPage: React.FunctionComponent<IControlsPageProps> = props => {
  const className = mergeStyles({
    selectors: {
      '.ExampleCard .ms-Icon.ms-DetailsHeader-dropHintCaretStyle': {
        display: 'none',
      },

      '.ExampleCard .ms-DetailsHeader-cell .ms-Icon': {
        display: 'none',
      },
    },
  });
  return (
    <div className={className}>
      <ControlsAreaPage {...props} {...DetailsListDragDropPageProps[props.platform!]} />;
    </div>
  );
};
