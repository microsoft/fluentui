import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { elementContains } from 'office-ui-fabric-react/lib/Utilities';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';

export interface ISectionTitleTextFieldProps {
  /** the unique id for section */
  id: string;
  /** the placeholder text */
  placeHolder: string;
  /** the row height of React-Grid-Layout */
  rowHeight?: number;
  /** call back function to update the section title */
  updateSectionTitle?: (key: string, title: string) => void;
  /** the className */
  className?: string;
}

export interface ISectionTitleTextFieldState {
  input: string;
}

export class SectionTitleTextField extends React.Component<ISectionTitleTextFieldProps, ISectionTitleTextFieldState> {
  private _hostElement = React.createRef<HTMLDivElement>();

  constructor(props: ISectionTitleTextFieldProps) {
    super(props);

    this.state = {
      input: this.props.placeHolder
    };
  }

  public componentDidMount(): void {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  public componentWillUnmount(): void {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  public render(): JSX.Element {
    return (
      <FocusTrapZone className={this.props.className}>
        <div ref={this._hostElement}>
          <TextField
            borderless
            placeholder={this.props.placeHolder}
            onChange={this._onInputChange}
            styles={{
              root: {
                height: this.props.rowHeight
              }
            }}
          />
        </div>
      </FocusTrapZone>
    );
  }

  /**
   * update the the input when user type
   */
  private _onInputChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, input?: string) => {
    if (input) {
      this.setState({
        ...this.state,
        input: input
      });
    }
  };

  /**
   * Only calls the callback function when click outside of the current element
   */
  private handleClickOutside = (event: Event): void => {
    const target = event.target as HTMLElement;
    if (this._hostElement.current && !elementContains(this._hostElement.current, target)) {
      if (this.props.updateSectionTitle) {
        this.props.updateSectionTitle(this.props.id, this.state.input);
      }
    }
  };
}
