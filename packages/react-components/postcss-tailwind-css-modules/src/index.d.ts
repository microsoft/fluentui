import type { Plugin, PluginCreator } from 'postcss';

declare function globalizeGroupMarkers(options?: globalizeGroupMarkers.Options): Plugin;

declare namespace globalizeGroupMarkers {
  interface Options {
    /**
     * Which files to rewrite, tested against the processed root's `source.input.file`.
     *
     * - A `RegExp` is tested against the file path.
     * - A function receives the file path and returns whether to rewrite it.
     * - `true` rewrites every rule regardless of filename — required when `source.input.file`
     *   is `undefined` (e.g. `postcss.process(css)` called with no `from`).
     *
     * Defaults to `/\.module\.css$/`.
     */
    include?: RegExp | ((file: string) => boolean) | true;
    /** Called once per rewritten rule. */
    onRewrite?: (info: { from: string; to: string; count: number }) => void;
  }

  const postcss: true;
  const globalizeGroupMarkers: PluginCreator<Options>;

  /**
   * `.group\/<name>` or `.peer\/<name>` — matches the escaped-slash form Tailwind emits in a
   * compiled selector.
   */
  const GROUP_OR_PEER_MARKER: RegExp;

  /** This plugin's `postcssPlugin` name: `'@fluentui/postcss-tailwind-css-modules'`. */
  const postcssPlugin: string;

  /** Wraps every un-wrapped `group/`/`peer/` marker in a selector string in `:global()`. */
  function globalizeSelector(selector: string): { selector: string; rewrites: number };
}

export = globalizeGroupMarkers;
