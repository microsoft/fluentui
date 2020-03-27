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

    if (stylesheet && registerStyles) {
      registerStyles(stylesheet, target);
    }

    return Component({ ...props, classes });
  };

  ComposedComponent.displayName = Component.displayName;
  ComposedComponent.defaultProps = Component.defaultProps;

  return ComposedComponent;
}
