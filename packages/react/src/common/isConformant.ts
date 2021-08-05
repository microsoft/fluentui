import { isConformant as baseIsConformant, IsConformantOptions } from '@fluentui/react-conformance';

export function isConformant<TProps = {}>(
  testInfo: Omit<IsConformantOptions<TProps>, 'componentPath'> & { componentPath?: string },
) {
  const defaultOptions: Partial<IsConformantOptions<TProps>> = {
    disabledTests: [
      'has-docblock',
      'kebab-aria-attributes',
      'is-static-property-of-parent',
      // Will enable with appropriate overrides separately
      'consistent-callback-names',
    ],
    skipAsPropTests: true,
    componentPath: module!.parent!.filename.replace('.test', ''),
  };

  baseIsConformant(defaultOptions, testInfo);
}
