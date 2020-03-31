import { useContext, FunctionComponent } from 'react';
import { ThemeContext } from 'react-fela';

export interface ComposeOptions {
  stylesheet?: string;
  classes?: { [key: string]: string };
}

// tslint:disable-next-line:no-any
export function compose<TProps>(Component: FunctionComponent<any>, options: ComposeOptions): FunctionComponent<TProps> {
  const { classes, stylesheet } = options;
  const ComposedComponent = (props: TProps) => {
    const context = useContext(ThemeContext);

    // tslint:disable-next-line: no-any
    const { registerStyles, target } = context as any;

    if (stylesheet && target && registerStyles) {
      registerStyles(stylesheet, target);
    }

    return typeof Component === 'function' ? Component({ ...props, classes }) : <Component {...stuff} />;
  };

  ComposedComponent.displayName = Component.displayName;

  // :( :( :(
  ComposedComponent.defaultProps = Component.defaultProps;

  // tslint:disable-next-line:no-any
  ComposedComponent.create = (Component as any).create;

  return ComposedComponent;
}
