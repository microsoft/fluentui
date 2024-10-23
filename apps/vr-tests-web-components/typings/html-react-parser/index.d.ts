/**
 * Typings override for invalid html-react-parser types
 * Types started explode after upgrading to TypeScript 4.9 which properly parses export maps within native ESM environments
 * @see https://github.com/remarkablemark/html-react-parser/issues/1305#issuecomment-2136962278
 */
declare module 'html-react-parser' {
  import type { Comment, Element, Node, ProcessingInstruction, Text } from 'domhandler';
  type DOMNode = Comment | Element | Node | ProcessingInstruction | Text;
  interface HTMLReactParserOptions {
    replace?: (domNode: DOMNode) => JSX.Element | Record<string, unknown> | void | undefined | null | false;

    trim?: boolean;
  }
  export default function parse(html: string, options?: HTMLReactParserOptions): string | JSX.Element | JSX.Element[];
}
