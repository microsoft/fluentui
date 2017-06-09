import { ExampleComponent } from './ExampleComponent';
import { IRenderFunction } from '@uifabric/utilities';

export interface IExampleComponentProps extends React.HTMLAttributes<HTMLDivElement | ExampleComponent> {
  /**
   * Optional icon name using fabric icons.
   *
   * @type {string}
   * @memberOf IExampleComponentProps
   */
  iconName?: string;

  /**
   * Optional text to display.
   *
   * @type {string}
   * @memberOf IExampleComponentProps
   */
  text?: string;

  /**
   * Optional render override for the root element.
   *
   * @type {IRenderFunction<IExampleComponentProps>}
   * @memberOf IExampleComponentProps
   */
  onRenderRoot?: IRenderFunction<IExampleComponentProps>;

  /**
   * Optional render override for the icon element.
   *
   * @type {IRenderFunction<IExampleComponentProps>}
   * @memberOf IExampleComponentProps
   */
  onRenderIcon?: IRenderFunction<IExampleComponentProps>;

  /**
   * Optional render override for the text element between the icon and chevron.
   *
   * @type {IRenderFunction<IExampleComponentProps>}
   * @memberOf IExampleComponentProps
   */
  onRenderText?: IRenderFunction<IExampleComponentProps>;

  /**
   * Optional render override for the chevron.
   *
   * @type {IRenderFunction<IExampleComponentProps>}
   * @memberOf IExampleComponentProps
   */
  onRenderChevron?: IRenderFunction<IExampleComponentProps>;
}