import * as React from 'react';
import { IComponentChecklistProps } from './ComponentChecklist.Props';

export class ComponentChecklist extends React.Component<IComponentChecklistProps, {}> {

  public static defaultProps: IComponentChecklistProps = {
    status: false,
    designApproved: false,
    keyboardAccessibilitySupport: false,
    highContrastSupport: false,
    rtlSupport: false
  };

  constructor(props: IComponentChecklistProps) {
    super(props);
  };

  public render() {

    return (
      <div>
        <ul>
          <li>
            Status:{ String(this.props.status) }
            Design Approved: { String(this.props.designApproved) }
            Keyboard Accessibility: { String(this.keyboardAccessibilitySupport) }
            High Contrast: { String(this.highContrastSupport) }
            Right to Left: { String(this.rtlSupport) }

          </li>
          <li>
          </li>
        </ul>
      </div>
    );
  }
}