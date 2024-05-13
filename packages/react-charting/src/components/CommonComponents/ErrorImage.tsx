/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { ITheme } from '@fluentui/react/lib/Styling';
import * as React from 'react';
import { ErrorBadgeIcon, StatusErrorFullIcon } from '@fluentui/react-icons-mdl2';

export interface IErrorImageProps {
  theme?: ITheme;
  width: number;
  height: number;
}
class ErrorImage extends React.Component<IErrorImageProps, {}> {
  constructor(props: IErrorImageProps) {
    super(props);
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        {this.props.theme && !this.props.theme!.isInverted ? (
          <ErrorBadgeIcon style={{ fontSize: this.props.width * 0.5, height: this.props.width * 0.5 }} />
        ) : (
          <StatusErrorFullIcon
            style={{ fontSize: this.props.width * 0.5, height: this.props.width * 0.5, color: 'white' }}
          />
        )}
      </div>
    );
  }
}

export default ErrorImage;
