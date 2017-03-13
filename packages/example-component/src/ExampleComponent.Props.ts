import { ExampleComponent } from './ExampleComponent';
import { IRenderFunction } from '@uifabric/utilities';

export interface IStyleObject {
  [key: string]: any;
};

export interface IExampleComponentTheme {
  width?: string;
  height?: string;
  background?: string;
  font?: IStyleObject;
}

export interface IExampleComponentProps extends React.HTMLProps<HTMLDivElement | ExampleComponent> {
  theme?: IExampleComponentTheme,

  iconName?: string;
  text?: string;
  // menuProps?: IMenuProps;

  onRenderRoot?: IRenderFunction<IExampleComponentProps>;
  onRenderIcon?: IRenderFunction<IExampleComponentProps>;
  onRenderText?: IRenderFunction<IExampleComponentProps>;
  onRenderDescription?: IRenderFunction<IExampleComponentProps>;
  onRenderChevron?: IRenderFunction<IExampleComponentProps>;
  onRenderMenu?: IRenderFunction<IExampleComponentProps>;
}