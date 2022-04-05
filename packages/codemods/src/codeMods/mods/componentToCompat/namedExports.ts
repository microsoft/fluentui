import { RawCompat } from './compatHelpers';
const buttonExports: string[] = [
  'DefaultButton',
  'ActionButton',
  'BaseButton',
  'ButtonType',
  'CommandBarButton',
  'CompoundButton',
  'ButtonType',
  'IconButton',
  'MessageBarButton',
  'PrimaryButton',
  'ElementType',
];
export const ExportMapping: RawCompat[] = [{ componentName: 'Button', namedExports: buttonExports }];
