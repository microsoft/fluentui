import * as React from 'react';

// Components
import { IFormTagPickerProps } from './FormTagPicker.types';
import { TagPicker, ITag, ITagPickerProps } from 'office-ui-fabric-react/lib/components/pickers/TagPicker/TagPicker';
import { FormBaseInput, IFormBaseInputState } from '../../FormBaseInput';
import { IFormContext } from '../../Form';

/**
 * TagPicker input for Form
 */
export class FormTagPicker extends FormBaseInput<Array<ITag>, IFormTagPickerProps, IFormBaseInputState<Array<ITag>>> {
  constructor(props: IFormTagPickerProps, context: IFormContext) {
    super(props, context);

    this.state = {
      isValid: true,
      currentValue: props.value,
      currentError: undefined
    };

    this._validateTagPickerProps(this.props.tagPickerProps);
  }

  /**
   * Render a Fabric TagPicker
   */
  public render(): JSX.Element {
    const { currentValue } = this.state;

    return (
      <TagPicker
        {...this.props.tagPickerProps}
        // These props cannot be overridden
        key={this.props.inputKey}
        onChange={this._onChange}
        selectedItems={currentValue}
      />
    );
  }

  private _onChange = (items: ITag[]): void => {
    this.setValue(items);
  };

  private _validateTagPickerProps(props?: ITagPickerProps): void {
    if (!props) {
      return;
    }

    if (props.selectedItems !== null && props.selectedItems !== undefined) {
      console.warn(`FormTagPicker: 'selectedItems' prop was specified and will be ignored`);
    }

    if (props.onChange) {
      console.warn(`FormTagPicker: 'onChange' prop was specified and will be ignored`);
    }
  }
}
