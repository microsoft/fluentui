/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { ITheme } from '@fluentui/react/lib/Styling';
import * as React from 'react';
import { ErrorIcon } from '@fluentui/react-icons-mdl2';

interface IMissingDataImageProps {
  theme?: ITheme;
  width: number;
  height: number;
}
class MissingDataImage extends React.Component<IMissingDataImageProps, {}> {
  constructor(props: IMissingDataImageProps) {
    super(props);
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        {this.props.theme && !this.props.theme!.isInverted ? (
          <ErrorIcon style={{ fontSize: this.props.width * 0.5, height: this.props.width * 0.5 }} />
        ) : (
          <ErrorIcon style={{ fontSize: this.props.width * 0.5, height: this.props.width * 0.5, color: 'white' }} />
        )}
      </div>
    );
  }
}

export default MissingDataImage;
