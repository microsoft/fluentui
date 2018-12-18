import { ITagPickerProps, ITag } from 'office-ui-fabric-react/lib/Pickers';
import { IFormBaseInputProps } from '../../FormBaseInput';
export { ITagPickerProps };

export interface IFormTagPickerProps extends IFormBaseInputProps<Array<ITag>> {
  /** Props for the TagPicker component */
  tagPickerProps: ITagPickerProps;
}
