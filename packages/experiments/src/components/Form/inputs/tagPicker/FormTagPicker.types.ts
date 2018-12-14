import { ITagPickerProps, ITag } from 'office-ui-fabric-react';
import { IFormBaseInputProps } from '../../FormBaseInput';
export { ITagPickerProps };

export interface IFormTagPickerProps extends IFormBaseInputProps<Array<ITag>> {
  /** Props for the TagPicker component */
  tagPickerProps: ITagPickerProps;
}
