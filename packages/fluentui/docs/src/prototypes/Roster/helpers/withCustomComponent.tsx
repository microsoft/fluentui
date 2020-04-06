import * as React from 'react';
import * as _ from 'lodash';

const withCustomComponent = (CustomComponent: React.ComponentType<any>, selectProps: string[]) => {
  return (Component, props) => {
    const componentProps = _.omit(props, selectProps);
    const customProps = _.pick(props, selectProps);
    return (
      <Component
        {...componentProps}
        title={{
          content: <CustomComponent {...customProps} />,
          selectionIndicator: null,
        }}
      />
    );
  };
};

export default withCustomComponent;
