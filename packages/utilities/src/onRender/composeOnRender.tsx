import { createMemoizer } from '../memoize';
import type { IOnRender } from '../IOnRender';

interface IOnRenderComposer {
  <TProps>(outer: IOnRender<TProps>): (inner: IOnRender<TProps>) => IOnRender<TProps>;
}

function createComposedOnRender<TProps>(outer: IOnRender<TProps>): (inner: IOnRender<TProps>) => IOnRender<TProps> {
  const outerMemoizer = createMemoizer((inner: IOnRender<TProps>) => {
    const innerMemoizer = createMemoizer((defaultRender: IOnRender<TProps>) => {
      function innerOnRenderWithDefaultRender(innerProps: TProps): JSX.Element | null {
        return inner(innerProps, defaultRender);
      }

      (innerOnRenderWithDefaultRender as {
        composed?: {
          outer: IOnRender<TProps>;
          inner: IOnRender<TProps>;
        };
      }).composed = {
        outer: inner,
        inner: defaultRender,
      };

      return innerOnRenderWithDefaultRender;
    });

    function outerOnRenderWithDefaultRender(outerProps: TProps, defaultRender?: IOnRender<TProps>): JSX.Element | null {
      return outer(outerProps, defaultRender ? innerMemoizer(defaultRender) : inner);
    }

    (outerOnRenderWithDefaultRender as {
      composed?: {
        outer: IOnRender<TProps>;
        inner: IOnRender<TProps>;
      };
    }).composed = {
      outer,
      inner,
    };

    return outerOnRenderWithDefaultRender;
  });

  return outerMemoizer;
}

const memoizer = createMemoizer<IOnRenderComposer>(createComposedOnRender);

/**
 * Composes two 'onRender___' callbacks to produce a final 'onRender___' callback that renders
 * the outer function, passing the inner function as 'default render'. The inner function
 * is then passed the original 'default render' prop.
 * @public
 */
export function composeOnRender<TProps>(outer: IOnRender<TProps>, inner: IOnRender<TProps>): IOnRender<TProps> {
  return memoizer(outer)(inner);
}
