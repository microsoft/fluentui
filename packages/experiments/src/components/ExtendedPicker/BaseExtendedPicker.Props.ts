
import { IBasePickerProps } from 'office-ui-fabric-react/lib/Pickers';
import { IBaseFloatingPickerProps } from './BaseFloatingPicker.Props';
import { BaseFloatingPicker } from './BaseFloatingPicker';

export interface IBaseExtendedPickerProps<T> extends IBasePickerProps<T> {
  /**
 * The floating picker type
 */
  floatingPickerType: new (props: IBaseFloatingPickerProps<T>) => BaseFloatingPicker<T, IBaseFloatingPickerProps<T>>;
}