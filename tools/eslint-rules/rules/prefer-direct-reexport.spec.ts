import { RuleTester } from '@typescript-eslint/rule-tester';
import { rule, RULE_NAME } from './prefer-direct-reexport';

const ruleTester = new RuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [
    {
      code: `
        export type { BaseProps as Props } from 'pkg';
      `,
    },
    {
      code: `
        export { renderBase as render } from 'pkg';
      `,
    },
    {
      code: `
        import type { BaseProps } from 'pkg';
        export interface Props extends BaseProps {}
      `,
    },
    {
      code: `
        import type { BaseProps } from 'pkg';
        type OtherProps = { other: boolean };
        export type Props = BaseProps & OtherProps;
      `,
    },
    {
      code: `
        import type { BaseProps } from 'pkg';
        export type Props = BaseProps<any>;
      `,
    },
    {
      code: `
        import type { BaseProps } from 'pkg';
        export type Props<T> = BaseProps;
      `,
    },
    {
      code: `
        import * as upstream from 'pkg';
        export const render = upstream.renderBase;
      `,
    },
    {
      code: `
        import * as local from 'pkg';
        export default local;
      `,
    },
    {
      code: `
        import * as local from 'pkg';
        export { local as default };
      `,
    },
    {
      code: `
        import type { BaseProps } from 'pkg';
        type LocalBaseProps = BaseProps;
        export type Props = LocalBaseProps;
      `,
    },
    {
      code: `
        import { renderBase } from 'pkg';
        export const [render] = [renderBase];
      `,
    },
    {
      code: `
        import { renderBase } from 'pkg';
        type PublicSignature = typeof renderBase;
        export const render: PublicSignature = renderBase;
      `,
    },
    {
      code: `
        import { renderBase } from 'pkg';
        type PublicType = typeof renderBase;
        export const render: PublicType = props => renderBase(props);
      `,
    },
    {
      code: `
        import { renderBase } from 'pkg';
        export let render = renderBase;
      `,
    },
    {
      code: `
        import { renderBase } from 'pkg';
        export let render = props => renderBase(props);
      `,
    },
    {
      code: `
        import { renderBase } from 'pkg';
        export const render = (value: unknown) => renderBase(value);
      `,
    },
    {
      code: `
        import { renderBase } from 'pkg';
        export const render = async props => renderBase(props);
      `,
    },
    {
      code: `
        import { renderBase } from 'pkg';
        export function* render(props) {
          return renderBase(props);
        }
      `,
    },
    {
      code: `
        import { renderBase } from 'pkg';
        export function render(value): unknown {
          return renderBase(value);
        }
      `,
    },
    {
      code: `
        import { renderBase } from 'pkg';
        export const render = function <T>(value: T): T {
          return renderBase(value);
        };
      `,
    },
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
    {
      code: `
        import { renderBase } from 'pkg';
        export const render = (props = defaultProps) => renderBase(props);
      `,
    },
    {
      code: `
        import { renderBase } from 'pkg';
        export const render = (...args) => renderBase(...args);
      `,
    },
    {
      code: `
        import { renderBase } from 'pkg';
        export const render = ({ props }) => renderBase(props);
      `,
    },
    {
      code: `
        import { renderBase } from 'pkg';
        export const render = (first, second) => renderBase(second, first);
      `,
    },
    {
      code: `
        import { renderBase } from 'pkg';
        export const render = first => renderBase(first, 1);
      `,
    },
    {
      code: `
        import { renderBase } from 'pkg';
        export const render = (first, second) => renderBase(first);
      `,
    },
    {
      code: `
        import { renderBase } from 'pkg';
        export const render = props => renderBase.call(undefined, props);
      `,
    },
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
    {
      code: `
        import type { BaseProps } from 'pkg';
        import { renderBase } from 'pkg';
        export const render = props => renderBase(props as BaseProps);
      `,
    },
    {
      code: `
        import { renderBase } from 'pkg';
        export const render = props => renderBase(props!);
      `,
    },
    {
      code: `
        import { renderBase } from 'pkg';
        export const render = props => renderBase<string>(props);
      `,
    },
    {
      code: `
        import { renderBase } from 'pkg';
        export const render = renderBase => renderBase(renderBase);
      `,
    },
    {
      code: `
        import { renderBase } from 'pkg';
        const render = renderBase;
        render.displayName = 'render';
        export { renderBase as publicRender } from 'pkg';
      `,
    },
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
    {
      code: `
        import { renderBase } from 'pkg';
        const sharedRender = renderBase;
        const render = sharedRender;
        const alsoRender = sharedRender;
        export { renderBase as publicRender } from 'pkg';
      `,
    },
    {
      code: `
        import { renderBase } from 'pkg';
        const localRender = renderBase;
        export { renderBase as publicRender } from 'pkg';
      `,
    },
  ],
  invalid: [
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
