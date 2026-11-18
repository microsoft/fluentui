// `moduleResolution: node` doesn't read package `exports`, so TypeScript can't find these subpaths (webpack does). The
// headless API has the same types as the default one.
declare module '@fluentui/react-icons/headless' {
  export { bundleIcon } from '@fluentui/react-icons';
}

declare module '@fluentui/react-icons/headless/svg/arrow-reply' {
  export { ArrowReplyFilled, ArrowReplyRegular } from '@fluentui/react-icons';
}
