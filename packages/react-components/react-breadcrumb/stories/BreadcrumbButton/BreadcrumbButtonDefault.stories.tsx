import * as React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbButton, BreadcrumbDivider } from '@fluentui/react-breadcrumb';
import { Tooltip } from '@fluentui/react-components';
import { Item, buttonItems } from '../Breadcrumb/data';

function renderButton(el: Item, isLastItem: boolean = false) {
  return (
    <React.Fragment key={`${el.key}-button`}>
      <Tooltip content="Item this is" relationship="label">
        <BreadcrumbItem>
          <BreadcrumbButton {...el.buttonProps}>{el.item}</BreadcrumbButton>
        </BreadcrumbItem>
      </Tooltip>

      {!isLastItem && <BreadcrumbDivider />}
    </React.Fragment>
  );
}
export const Default = () => (
  <>
    <Breadcrumb size="large">{buttonItems.map(el => renderButton(el, el.key === buttonItems.length - 1))}</Breadcrumb>
  </>
);
