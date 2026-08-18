import { RuleTester } from '@typescript-eslint/rule-tester';
import { rule, RULE_NAME } from './prefer-direct-reexport';

const ruleTester = new RuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [
    // valid: Already a direct re-export.
    {
      code: `
        export type { BaseProps as Props } from 'pkg';
      `,
    },
    // valid: Already a direct re-export.
    {
      code: `
        export { renderBase as render } from 'pkg';
      `,
    },
    // valid: `extends` declares a new interface instead of renaming the imported one.
    {
      code: `
        import type { BaseProps } from 'pkg';
        export interface Props extends BaseProps {}
      `,
    },
    // valid: An intersection declares a new type.
    {
      code: `
        import type { BaseProps } from 'pkg';
        type OtherProps = { other: boolean };
        export type Props = BaseProps & OtherProps;
      `,
    },
    // valid: Instantiating a generic declares a new type.
    {
      code: `
        import type { BaseProps } from 'pkg';
        export type Props = BaseProps<any>;
      `,
    },
    // valid: A generic alias declares a new type constructor.
    {
      code: `
        import type { BaseProps } from 'pkg';
        export type Props<T> = BaseProps;
      `,
    },
    // valid: `export … from` cannot address a single member of a namespace binding.
    {
      code: `
        import * as upstream from 'pkg';
        export const render = upstream.renderBase;
      `,
    },
    // valid: A namespace import has no `export … from` default equivalent.
    {
      code: `
        import * as local from 'pkg';
        export default local;
      `,
    },
    // valid: A namespace import has no `export … from` default equivalent.
    {
      code: `
        import * as local from 'pkg';
        export { local as default };
      `,
    },
    // valid: Destructuring is not an alias of the import.
    {
      code: `
        import { renderBase } from 'pkg';
        export const [render] = [renderBase];
      `,
    },
    // valid: The annotation narrows the public signature, so the export is not the import.
    {
      code: `
        import { renderBase } from 'pkg';
        type PublicSignature = typeof renderBase;
        export const render: PublicSignature = renderBase;
      `,
    },
    // valid: The annotation narrows the public signature, so the export is not the import.
    {
      code: `
        import { renderBase } from 'pkg';
        type PublicType = typeof renderBase;
        export const render: PublicType = props => renderBase(props);
      `,
    },
    // valid: The binding is reassigned, so it is a live mutable export that `export … from` cannot express.
    {
      code: `
        import { renderBase } from 'pkg';
        export let render = renderBase;
        render = renderOther;
      `,
    },
    // valid: The binding is reassigned, so it is a live mutable export that `export … from` cannot express.
    {
      code: `
        import { renderBase } from 'pkg';
        export let render = props => renderBase(props);
        render = renderOther;
      `,
    },
    // valid: An annotated parameter narrows the public signature.
    {
      code: `
        import { renderBase } from 'pkg';
        export const render = (value: unknown) => renderBase(value);
      `,
    },
    // valid: `async` wraps the result in a promise.
    {
      code: `
        import { renderBase } from 'pkg';
        export const render = async props => renderBase(props);
      `,
    },
    // valid: A generator returns an iterator instead of the call result.
    {
      code: `
        import { renderBase } from 'pkg';
        export function* render(props) {
          return renderBase(props);
        }
      `,
    },
    // valid: The return type annotation narrows the public signature.
    {
      code: `
        import { renderBase } from 'pkg';
        export function render(value): unknown {
          return renderBase(value);
        }
      `,
    },
    // valid: Type parameters and annotations narrow the public signature.
    {
      code: `
        import { renderBase } from 'pkg';
        export const render = function <T>(value: T): T {
          return renderBase(value);
        };
      `,
    },
    // valid: The function declaration is reassigned, so the export is not the import.
    {
      code: `
        import { renderBase } from 'pkg';
        const otherRender = props => props;
        export function render(props) {
          return renderBase(props);
        }
        render = otherRender;
      `,
    },
    // valid: The function declaration is reassigned, so the export is not the import.
    {
      code: `
        import { renderBase } from 'pkg';
        const otherRender = props => props;
        function render(props) {
          return renderBase(props);
        }
        render = otherRender;
        export { render };
      `,
    },
    // valid: A default parameter value changes what reaches the call.
    {
      code: `
        import { renderBase } from 'pkg';
        export const render = (props = defaultProps) => renderBase(props);
      `,
    },
    // valid: A rest parameter does not forward a fixed signature.
    {
      code: `
        import { renderBase } from 'pkg';
        export const render = (...args) => renderBase(...args);
      `,
    },
    // valid: A destructured parameter changes what reaches the call.
    {
      code: `
        import { renderBase } from 'pkg';
        export const render = ({ props }) => renderBase(props);
      `,
    },
    // valid: The arguments are reordered.
    {
      code: `
        import { renderBase } from 'pkg';
        export const render = (first, second) => renderBase(second, first);
      `,
    },
    // valid: An extra argument is added.
    {
      code: `
        import { renderBase } from 'pkg';
        export const render = first => renderBase(first, 1);
      `,
    },
    // valid: An argument is dropped.
    {
      code: `
        import { renderBase } from 'pkg';
        export const render = (first, second) => renderBase(first);
      `,
    },
    // valid: `.call` is not a direct invocation.
    {
      code: `
        import { renderBase } from 'pkg';
        export const render = props => renderBase.call(undefined, props);
      `,
    },
    // valid: The wrapper runs an extra statement.
    {
      code: `
        import { renderBase } from 'pkg';
        const before = () => {};
        export const render = props => {
          before();
          return renderBase(props);
        };
      `,
    },
    // valid: The argument is asserted before it is forwarded.
    {
      code: `
        import type { BaseProps } from 'pkg';
        import { renderBase } from 'pkg';
        export const render = props => renderBase(props as BaseProps);
      `,
    },
    // valid: The argument is asserted before it is forwarded.
    {
      code: `
        import { renderBase } from 'pkg';
        export const render = props => renderBase(props!);
      `,
    },
    // valid: Explicit type arguments narrow the call.
    {
      code: `
        import { renderBase } from 'pkg';
        export const render = props => renderBase<string>(props);
      `,
    },
    // valid: The parameter shadows the import, so the call never reaches it.
    {
      code: `
        import { renderBase } from 'pkg';
        export const render = renderBase => renderBase(renderBase);
      `,
    },
    // valid: The local alias is never exported; only a property is assigned to it.
    {
      code: `
        import { renderBase } from 'pkg';
        const render = renderBase;
        render.displayName = 'render';
        export { renderBase as publicRender } from 'pkg';
      `,
    },
    // valid: The local wrapper is never exported; only a property is assigned to it.
    {
      code: `
        import { renderBase } from 'pkg';
        function render(props) {
          return renderBase(props);
        }
        render.displayName = 'render';
        export { renderBase as publicRender } from 'pkg';
      `,
    },
    // valid: The alias chain is never exported.
    {
      code: `
        import { renderBase } from 'pkg';
        const sharedRender = renderBase;
        const render = sharedRender;
        const alsoRender = sharedRender;
        export { renderBase as publicRender } from 'pkg';
      `,
    },
    // valid: The alias is never exported.
    {
      code: `
        import { renderBase } from 'pkg';
        const localRender = renderBase;
        export { renderBase as publicRender } from 'pkg';
      `,
    },
  ],
  invalid: [
    // A locally used alias is still a violation: the fix drops the alias and switches its use sites
    // to the imported name, so `Props` becomes `BaseProps` inside `Wrapper`.
    // Prefer: export type { BaseProps as Props } from 'pkg';
    {
      code: `
        import type { BaseProps } from 'pkg';
        export type Props = BaseProps;
        export type Wrapper = { inner: Props };
      `,
      errors: [
        {
          messageId: 'preferTypeReexport',
          data: { source: 'pkg', importedName: 'BaseProps', exportedName: 'Props' },
        },
      ],
    },
    // Reported the same way when the export is a specifier rather than part of the declaration.
    // Prefer: export type { BaseProps as Props } from 'pkg';
    {
      code: `
        import type { BaseProps } from 'pkg';
        type Props = BaseProps;
        export type Wrapper = { inner: Props };
        export type { Props };
      `,
      errors: [
        {
          messageId: 'preferTypeReexport',
          data: { source: 'pkg', importedName: 'BaseProps', exportedName: 'Props' },
        },
      ],
    },
    // Prefer: export { renderBase as render } from 'pkg';
    {
      code: `
        import { renderBase } from 'pkg';
        export const render = renderBase;
        export const renderTwice = props => render(render(props));
      `,
      errors: [
        {
          messageId: 'preferValueReexport',
          data: { source: 'pkg', importedName: 'renderBase', exportedName: 'render' },
        },
      ],
    },
    // Prefer: export { renderBase as render } from 'pkg';
    {
      code: `
        import { renderBase } from 'pkg';
        export function render(props) {
          return renderBase(props);
        }
        export const renderTwice = props => render(render(props));
      `,
      errors: [
        {
          messageId: 'preferFunctionReexport',
          data: { source: 'pkg', importedName: 'renderBase', exportedName: 'render' },
        },
      ],
    },
    // Prefer: export type { BaseProps as Props } from 'pkg';
    // The local alias is transparent, so the chain still resolves to the imported type.
    {
      code: `
        import type { BaseProps } from 'pkg';
        type LocalBaseProps = BaseProps;
        export type Props = LocalBaseProps;
      `,
      errors: [
        {
          messageId: 'preferTypeReexport',
          data: {
            source: 'pkg',
            importedName: 'BaseProps',
            exportedName: 'Props',
          },
        },
      ],
    },
    // Prefer: export { renderBase as render } from 'pkg';
    // A `let` that is never reassigned is not a live binding, so it is a plain re-export.
    {
      code: `
        import { renderBase } from 'pkg';
        export let render = renderBase;
      `,
      errors: [
        {
          messageId: 'preferValueReexport',
          data: {
            source: 'pkg',
            importedName: 'renderBase',
            exportedName: 'render',
          },
        },
      ],
    },
    // Prefer: export { renderBase as render } from 'pkg';
    {
      code: `
        import { renderBase } from 'pkg';
        export let render = props => renderBase(props);
      `,
      errors: [
        {
          messageId: 'preferFunctionReexport',
          data: {
            source: 'pkg',
            importedName: 'renderBase',
            exportedName: 'render',
          },
        },
      ],
    },
    // Prefer: export { default as render } from 'pkg';
    {
      code: `
        import renderBase, { keep } from 'pkg';
        export const render = renderBase;
      `,
      errors: [
        {
          messageId: 'preferValueReexport',
          data: {
            source: 'pkg',
            importedName: 'default',
            exportedName: 'render',
          },
        },
      ],
    },
    // Prefer: export { default as render } from 'pkg';
    {
      code: `
        import { default as local, keep } from 'pkg';
        export const render = local;
      `,
      errors: [
        {
          messageId: 'preferValueReexport',
          data: {
            source: 'pkg',
            importedName: 'default',
            exportedName: 'render',
          },
        },
      ],
    },
    // Prefer: export { renderBase as default } from 'pkg';
    {
      code: `
        import { keep, renderBase } from 'pkg';
        export default renderBase;
      `,
      errors: [
        {
          messageId: 'preferValueReexport',
          data: {
            source: 'pkg',
            importedName: 'renderBase',
            exportedName: 'default',
          },
        },
      ],
    },
    // Prefer: export { renderBase as default } from 'pkg';
    {
      code: `
        import { keep, /* remove this comment with renderBase */ renderBase } from 'pkg';
        void keep;
        export default renderBase;
      `,
      errors: [
        {
          messageId: 'preferValueReexport',
          data: {
            source: 'pkg',
            importedName: 'renderBase',
            exportedName: 'default',
          },
        },
      ],
    },
    // Prefer: export { default } from 'pkg';
    {
      code: `
        import renderBase, { keep } from 'pkg';
        export default renderBase;
      `,
      errors: [
        {
          messageId: 'preferValueReexport',
          data: {
            source: 'pkg',
            importedName: 'default',
            exportedName: 'default',
          },
        },
      ],
    },
    // Prefer: export * as publicName from 'pkg';
    {
      code: `
        import * as local from 'pkg';
        export { local as publicName };
      `,
      errors: [
        {
          messageId: 'preferValueReexport',
          data: {
            source: 'pkg',
            importedName: '*',
            exportedName: 'publicName',
          },
        },
      ],
    },
    // Prefer: export * as publicName from 'pkg';
    {
      code: `
        import * as local from 'pkg';
        export const publicName = local;
      `,
      errors: [
        {
          messageId: 'preferValueReexport',
          data: {
            source: 'pkg',
            importedName: '*',
            exportedName: 'publicName',
          },
        },
      ],
    },
    // Prefer: export { renderBase as render } from 'pkg';
    {
      code: `
        import { renderBase } from 'pkg';
        const localRender = renderBase;
        export const render = localRender;
      `,
      errors: [
        {
          messageId: 'preferValueReexport',
          data: {
            source: 'pkg',
            importedName: 'renderBase',
            exportedName: 'render',
          },
        },
      ],
    },
    // Prefer: export { renderBase as render } from 'pkg';
    {
      code: `
        import { renderBase } from 'pkg';
        const localRender = renderBase;
        const render = localRender;
        export { render };
      `,
      errors: [
        {
          messageId: 'preferValueReexport',
          data: {
            source: 'pkg',
            importedName: 'renderBase',
            exportedName: 'render',
          },
        },
      ],
    },
    // Prefer: export { renderBase as render } from 'pkg';
    {
      code: `
        import { renderBase } from 'pkg';
        const localRender = renderBase;
        export const render = props => localRender(props);
      `,
      errors: [
        {
          messageId: 'preferFunctionReexport',
          data: {
            source: 'pkg',
            importedName: 'renderBase',
            exportedName: 'render',
          },
        },
      ],
    },
    // Prefer: export type { BaseProps as Props } from 'pkg';
    {
      code: `
        import type { BaseProps } from 'pkg';
        export type Props = BaseProps;
      `,
      errors: [
        {
          messageId: 'preferTypeReexport',
          data: {
            source: 'pkg',
            importedName: 'BaseProps',
            exportedName: 'Props',
          },
        },
      ],
    },
    // Prefer: export type { BaseProps as Props } from 'pkg';
    {
      code: `
        import { BaseProps as UpstreamBaseProps } from 'pkg';
        export type Props = UpstreamBaseProps;
      `,
      errors: [
        {
          messageId: 'preferTypeReexport',
          data: {
            source: 'pkg',
            importedName: 'BaseProps',
            exportedName: 'Props',
          },
        },
      ],
    },
    // Prefer: export { renderBase as render } from 'pkg';
    {
      code: `
        import { renderBase } from 'pkg';
        export const render = renderBase;
      `,
      errors: [
        {
          messageId: 'preferValueReexport',
          data: {
            source: 'pkg',
            importedName: 'renderBase',
            exportedName: 'render',
          },
        },
      ],
    },
    // Prefer: export { renderBase as render } from 'pkg';
    {
      code: `
        import { renderBase } from 'pkg';
        export { renderBase as render };
      `,
      errors: [
        {
          messageId: 'preferValueReexport',
          data: {
            source: 'pkg',
            importedName: 'renderBase',
            exportedName: 'render',
          },
        },
      ],
    },
    // Prefer: export { keep, renderBase as render } from 'pkg';
    {
      code: `
        import { renderBase } from 'pkg';
        export { keep } from 'pkg';
        export { renderBase as render };
      `,
      errors: [
        {
          messageId: 'preferValueReexport',
          data: {
            source: 'pkg',
            importedName: 'renderBase',
            exportedName: 'render',
          },
        },
      ],
    },
    // Prefer: export { keep, renderBase as render } from 'pkg';
    {
      code: `
        export { keep } from 'pkg';
        import { renderBase } from 'pkg';
        export { renderBase as render };
      `,
      errors: [
        {
          messageId: 'preferValueReexport',
          data: {
            source: 'pkg',
            importedName: 'renderBase',
            exportedName: 'render',
          },
        },
      ],
    },
    // Prefer: export { renderBase as render } from 'pkg';
    {
      code: `
        import { renderBase } from 'pkg';
        export {} from 'pkg';
        export { renderBase as render };
      `,
      errors: [
        {
          messageId: 'preferValueReexport',
          data: {
            source: 'pkg',
            importedName: 'renderBase',
            exportedName: 'render',
          },
        },
      ],
    },
    // Prefer: export { keep, type BaseProps as Props } from 'pkg';
    {
      code: `
        import type { BaseProps } from 'pkg';
        export { keep } from 'pkg';
        export type { BaseProps as Props };
      `,
      errors: [
        {
          messageId: 'preferTypeReexport',
          data: {
            source: 'pkg',
            importedName: 'BaseProps',
            exportedName: 'Props',
          },
        },
      ],
    },
    // Prefer: export type { BaseProps as Props } from 'pkg';
    {
      code: `
        import type { BaseProps as LocalProps, OtherProps } from 'pkg';
        export type { LocalProps as Props };
      `,
      errors: [
        {
          messageId: 'preferTypeReexport',
          data: {
            source: 'pkg',
            importedName: 'BaseProps',
            exportedName: 'Props',
          },
        },
      ],
    },
    // Prefer: export type { Keep, BaseProps as Props } from 'pkg';
    {
      code: `
        import type { BaseProps } from 'pkg';
        export { keep } from 'pkg';
        export type { Keep } from 'pkg';
        export type { BaseProps as Props };
      `,
      errors: [
        {
          messageId: 'preferTypeReexport',
          data: {
            source: 'pkg',
            importedName: 'BaseProps',
            exportedName: 'Props',
          },
        },
      ],
    },
    // Prefer: export type { Keep, BaseProps as Props } from 'pkg';
    {
      code: `
        import type { BaseProps } from 'pkg';
        export type { Keep } from 'pkg';
        export type { BaseProps as Props };
      `,
      errors: [
        {
          messageId: 'preferTypeReexport',
          data: {
            source: 'pkg',
            importedName: 'BaseProps',
            exportedName: 'Props',
          },
        },
      ],
    },
    // Prefer: export type { BaseProps as Props } from 'pkg';
    {
      code: `
        import type { BaseProps as LocalProps, OtherProps } from 'pkg';
        export { type LocalProps as Props };
      `,
      errors: [
        {
          messageId: 'preferTypeReexport',
          data: {
            source: 'pkg',
            importedName: 'BaseProps',
            exportedName: 'Props',
          },
        },
      ],
    },
    // Prefer: export type { BaseProps as Props } from 'pkg';
    {
      code: `
        import type { BaseProps } from 'pkg';
        export { BaseProps as Props };
      `,
      errors: [
        {
          messageId: 'preferTypeReexport',
          data: {
            source: 'pkg',
            importedName: 'BaseProps',
            exportedName: 'Props',
          },
        },
      ],
    },
    // Prefer: export { upstream as publicRender } from 'pkg';
    {
      code: `
        import { keep, upstream as local } from 'pkg';
        export const publicRender = local;
      `,
      errors: [
        {
          messageId: 'preferValueReexport',
          data: {
            source: 'pkg',
            importedName: 'upstream',
            exportedName: 'publicRender',
          },
        },
      ],
    },
    // Prefer: export { upstream as publicRender } from 'pkg';
    {
      code: `
        import { keep, upstream as local } from 'pkg';
        export { local as publicRender };
      `,
      errors: [
        {
          messageId: 'preferValueReexport',
          data: {
            source: 'pkg',
            importedName: 'upstream',
            exportedName: 'publicRender',
          },
        },
      ],
    },
    // Prefer: export { "render-base" as "render" } from 'pkg';
    {
      code: `
        import { "render-base" as local } from 'pkg';
        export { local as "render" };
      `,
      errors: [
        {
          messageId: 'preferValueReexport',
          data: {
            source: 'pkg',
            importedName: 'render-base',
            exportedName: 'render',
          },
        },
      ],
    },
    // Prefer: export { default } from 'pkg' assert { type: 'json' };
    {
      code: `
        import data, { keep } from 'pkg' assert { type: 'json' };
        export { data as default };
      `,
      errors: [
        {
          messageId: 'preferValueReexport',
          data: {
            source: 'pkg',
            importedName: 'default',
            exportedName: 'default',
          },
        },
      ],
    },
    // Prefer: export { value as named } from 'pkg' with { type: 'json' };
    {
      code: `
        import { keep, value } from 'pkg' with { type: 'json' };
        export { value as named };
      `,
      errors: [
        {
          messageId: 'preferValueReexport',
          data: {
            source: 'pkg',
            importedName: 'value',
            exportedName: 'named',
          },
        },
      ],
    },
    // Prefer: export { other, value as named } from 'pkg' with { type: 'json' };
    {
      code: `
        import { value } from 'pkg' with { type: 'json' };
        export { keep } from 'pkg';
        export { other } from 'pkg' with { type: 'json' };
        export { value as named };
      `,
      errors: [
        {
          messageId: 'preferValueReexport',
          data: {
            source: 'pkg',
            importedName: 'value',
            exportedName: 'named',
          },
        },
      ],
    },
    // Prefer: export { renderBase as render } from 'pkg';
    {
      code: `
        import { renderBase } from 'pkg';
        export const render = props => renderBase(props);
      `,
      errors: [
        {
          messageId: 'preferFunctionReexport',
          data: {
            source: 'pkg',
            importedName: 'renderBase',
            exportedName: 'render',
          },
        },
      ],
    },
    // Prefer: export { renderBase as publicRender } from 'pkg';
    {
      code: `
        import { renderBase } from 'pkg';
        const render = props => renderBase(props);
        export { render as publicRender };
      `,
      errors: [
        {
          messageId: 'preferFunctionReexport',
          data: {
            source: 'pkg',
            importedName: 'renderBase',
            exportedName: 'publicRender',
          },
        },
      ],
    },
    // Prefer: export type { BaseProps as PublicProps } from 'pkg';
    {
      code: `
        import type { BaseProps } from 'pkg';
        type Props = BaseProps;
        export type { Props as PublicProps };
      `,
      errors: [
        {
          messageId: 'preferTypeReexport',
          data: {
            source: 'pkg',
            importedName: 'BaseProps',
            exportedName: 'PublicProps',
          },
        },
      ],
    },
    // Prefer: export type { BaseProps as PublicProps } from 'pkg';
    {
      code: `
        import type { BaseProps } from 'pkg';
        type Props = BaseProps;
        export { Props as PublicProps };
      `,
      errors: [
        {
          messageId: 'preferTypeReexport',
          data: {
            source: 'pkg',
            importedName: 'BaseProps',
            exportedName: 'PublicProps',
          },
        },
      ],
    },
    // Prefer: export { renderBase as render } from 'pkg';
    {
      code: `
        import { renderBase } from 'pkg';
        export function render(props, options) {
          return renderBase(props, options);
        }
      `,
      errors: [
        {
          messageId: 'preferFunctionReexport',
          data: {
            source: 'pkg',
            importedName: 'renderBase',
            exportedName: 'render',
          },
        },
      ],
    },
    // Prefer: export { other, "pkg" as "pkg" } from 'pkg' with { type: 'json' };
    {
      code: `
        import { "pkg" as local } from 'pkg' with { type: 'json' };
        export { keep } from 'pkg';
        export { other } from 'pkg' with { type: 'json' };
        export { local as "pkg" };
      `,
      errors: [
        {
          messageId: 'preferValueReexport',
          data: {
            source: 'pkg',
            importedName: 'pkg',
            exportedName: 'pkg',
          },
        },
      ],
    },
    // Prefer: export { renderBase as render } from 'pkg';
    {
      code: `
        import { renderBase } from 'pkg';
        /** public render */
        export const render = renderBase;
      `,
      errors: [
        {
          messageId: 'preferValueReexport',
          data: {
            source: 'pkg',
            importedName: 'renderBase',
            exportedName: 'render',
          },
        },
      ],
    },
    // Prefer: export { renderBase as publicRender } from 'pkg';
    {
      code: `
        import { renderBase } from 'pkg';
        const render = renderBase;
        render.displayName = 'render';
        export { render as publicRender };
      `,
      errors: [
        {
          messageId: 'preferValueReexport',
          data: {
            source: 'pkg',
            importedName: 'renderBase',
            exportedName: 'publicRender',
          },
        },
      ],
    },
    // Prefer: export { renderBase as publicRender } from 'pkg';
    {
      code: `
        import { renderBase } from 'pkg';
        function render(props) {
          return renderBase(props);
        }
        void render;
        export { render as publicRender };
      `,
      errors: [
        {
          messageId: 'preferFunctionReexport',
          data: {
            source: 'pkg',
            importedName: 'renderBase',
            exportedName: 'publicRender',
          },
        },
      ],
    },
    // Prefer: export { renderBase as publicRender } from 'pkg';
    {
      code: `
        import { renderBase } from 'pkg';
        const sharedRender = renderBase;
        const render = sharedRender;
        const alsoRender = sharedRender;
        export { render as publicRender };
      `,
      errors: [
        {
          messageId: 'preferValueReexport',
          data: {
            source: 'pkg',
            importedName: 'renderBase',
            exportedName: 'publicRender',
          },
        },
      ],
    },
    // Prefer: export { renderBase as render } from 'pkg';
    {
      code: `
        import { renderBase } from 'pkg';
        const keep = 1;
        export const render = renderBase, other = keep;
      `,
      errors: [
        {
          messageId: 'preferValueReexport',
          data: {
            source: 'pkg',
            importedName: 'renderBase',
            exportedName: 'render',
          },
        },
      ],
    },
    // Prefer: export { firstBase as first } from 'pkg';
    {
      code: `
        import { firstBase, secondBase } from 'pkg';
        export const first = firstBase, second = secondBase;
      `,
      errors: [
        {
          messageId: 'preferValueReexport',
          data: {
            source: 'pkg',
            importedName: 'firstBase',
            exportedName: 'first',
          },
        },
        {
          messageId: 'preferValueReexport',
          data: {
            source: 'pkg',
            importedName: 'secondBase',
            exportedName: 'second',
          },
        },
      ],
    },
    // Prefer: export type { BaseProps as PublicProps } from 'pkg';
    {
      code: `
        import { BaseProps } from 'pkg';
        export type PublicProps = BaseProps;
      `,
      errors: [
        {
          messageId: 'preferTypeReexport',
          data: {
            source: 'pkg',
            importedName: 'BaseProps',
            exportedName: 'PublicProps',
          },
        },
      ],
    },
    // Prefer: export { renderBase as publicRender } from 'pkg';
    {
      code: `
        import { renderBase } from 'pkg';
        const localRender = renderBase;
        export const publicRender = renderBase;
      `,
      errors: [
        {
          messageId: 'preferValueReexport',
          data: {
            source: 'pkg',
            importedName: 'renderBase',
            exportedName: 'publicRender',
          },
        },
      ],
    },
    // Prefer: export { renderBase as publicRender } from 'pkg';
    {
      code: `
        import { renderBase } from 'pkg';
        const stable = 1;
        export {
          renderBase as publicRender,
          // keep this export comment
          stable,
        };
      `,
      errors: [
        {
          messageId: 'preferValueReexport',
          data: {
            source: 'pkg',
            importedName: 'renderBase',
            exportedName: 'publicRender',
          },
        },
      ],
    },
    // Prefer: export { stable }; export { renderBase as publicRender } from 'pkg';
    {
      code: `
        import {
          keep, // keep this import comment
          renderBase,
        } from 'pkg';
        const stable = 1;
        export {
          stable, // keep this export comment
        };
        export { renderBase as publicRender };
      `,
      errors: [
        {
          messageId: 'preferValueReexport',
          data: {
            source: 'pkg',
            importedName: 'renderBase',
            exportedName: 'publicRender',
          },
        },
      ],
    },
  ],
});
