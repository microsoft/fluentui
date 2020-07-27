import * as React from 'react';
import { CompoundButton } from 'office-ui-fabric-react/lib/Button';
import { ButtonProps } from './mButtonStyles';
//import { IButtonProps } from 'office-ui-fabric-react';

export class RenderButton extends React.Component<ButtonProps> {
  public render(): JSX.Element {
    const { id, ...restProps } = this.props;
    return (
      <div>
        <CompoundButton {...this.props} />
        <CompoundButton {...restProps} id={'d2'}>
          Button!
        </CompoundButton>
      </div>
    );
  }
}

export interface SimpleProps {
  id: string;
  description?: string;
  imageSource: string;
  toggled?: boolean;
}

// export const RenderButton = (props: ButtonProps) => {
//   const { id, ...restProps } = props;
//   return (
//     <div>
//       <CompoundButton {...props} />
//       <CompoundButton {...restProps} id={'d2'}>
//         Button!
//       </CompoundButton>
//     </div>
//   );
// };
