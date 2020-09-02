import * as React from 'react';
import { Provider, Text, Box, BoxProps, ShorthandValue } from '@fluentui/react-northstar';

export interface LogoProps {
  companyName?: string;
  icon?: ShorthandValue<BoxProps>;
  style?: React.CSSProperties;
}

class MSTeamsLogo extends React.Component<LogoProps, any> {
  render() {
    const { companyName, icon, style } = this.props;
    return (
      <Provider.Consumer
        render={({ siteVariables }) => {
          return (
            <div style={style}>
              {Box.create(icon, {
                defaultProps: () => ({
                  as: 'span',
                  styles: { verticalAlign: 'middle', color: siteVariables.colors.white },
                }),
              })}
              <Text
                styles={{
                  color: siteVariables.colors.white,
                  verticalAlign: 'middle',
                  lineHeight: '40px',
                }}
              >
                {companyName}
              </Text>
            </div>
          );
        }}
      />
    );
  }
}

export default MSTeamsLogo;
