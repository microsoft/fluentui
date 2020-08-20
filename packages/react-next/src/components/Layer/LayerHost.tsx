// import * as React from 'react';
// import { css } from '../../Utilities';
// import { ILayerHostProps } from './LayerHost.types';
// import { notifyHostChanged } from './Layer.notification';

// export const LayerHost = React.memo((props: ILayerHostProps) => {
//   const { id, className } = props;

//   React.useEffect(() => {
//     notifyHostChanged(id!);

//     return () => {
//       notifyHostChanged(id!);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps -- should only run on first render
//   }, []);

//   return <div {...props} className={css('ms-LayerHost', className)} />;
// });

import * as React from 'react';
import { css } from '../../Utilities';
import { ILayerHostProps } from './LayerHost.types';
import { notifyHostChanged } from './Layer.notification';

export class LayerHost extends React.Component<ILayerHostProps> {
  public shouldComponentUpdate() {
    return false;
  }

  public componentDidMount(): void {
    notifyHostChanged(this.props.id!);
  }

  public componentWillUnmount(): void {
    notifyHostChanged(this.props.id!);
  }

  public render(): JSX.Element {
    return <div {...this.props} className={css('ms-LayerHost', this.props.className)} />;
  }
}
