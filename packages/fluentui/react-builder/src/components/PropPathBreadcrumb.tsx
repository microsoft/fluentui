import * as React from 'react';
import { Breadcrumb } from '@fluentui/react-northstar';
import { JSONTreeElement } from './types';

interface PropPathBreadcrumbProps {
  onPropNavigate: ({ jsonTreeElement, path }: { jsonTreeElement: JSONTreeElement; path: string[] }) => void;
  jsonTreeElement: JSONTreeElement;
  propPath: string[];
  displayName: string;
}

export const PropPathBreadcrumb: React.FC<PropPathBreadcrumbProps> = props => {
  const { onPropNavigate, jsonTreeElement, displayName, propPath } = props;

  return (
    <Breadcrumb aria-label="Nested properties">
      <Breadcrumb.Item key="root">
        <Breadcrumb.Link
          href="#"
          onClick={e => {
            onPropNavigate({ jsonTreeElement, path: [] });
            e.preventDefault();
          }}
        >
          {displayName}
        </Breadcrumb.Link>
      </Breadcrumb.Item>
      {propPath.map((prop, i) => (
        <React.Fragment key={prop}>
          <Breadcrumb.Divider />
          <Breadcrumb.Item>
            <Breadcrumb.Link
              href=""
              onClick={e => {
                onPropNavigate({ jsonTreeElement, path: propPath.slice(0, i + 1) });
                e.preventDefault();
              }}
            >
              {prop}
            </Breadcrumb.Link>
          </Breadcrumb.Item>
        </React.Fragment>
      ))}
    </Breadcrumb>
  );
};
