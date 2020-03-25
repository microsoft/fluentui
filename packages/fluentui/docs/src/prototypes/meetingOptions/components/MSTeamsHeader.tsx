import * as React from 'react';
import { Provider } from '@fluentui/react-northstar';
import { middleColumnStyles } from '../styles';

export default props => {
  return (
    <Provider.Consumer
      render={({ siteVariables }) => {
        return (
          <div style={{ backgroundColor: siteVariables.colors.brand[600] }}>
            <div style={{ ...middleColumnStyles }}>{props.content}</div>
          </div>
        );
      }}
    />
  );
};
