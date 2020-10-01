import { isConformant as baseIsConformant, IsConformantOptions } from '@fluentui/react-conformance';

export function isConformant(testInfo: Omit<IsConformantOptions, 'componentPath'> & { componentPath?: string }) {
  const defaultOptions = {
    disabledTests: [
      'has-docblock',
      'kebab-aria-attributes',
      'is-static-property-of-parent',
      'consistent-callback-names',
    ],
    componentPath: module!.parent!.filename.replace('.test', ''),
  };

  baseIsConformant(defaultOptions, testInfo);
}
