import { isConformant as baseIsConformant } from '@fluentui/react-conformance';
import type { IsConformantOptions } from '@fluentui/react-conformance';

export function isConformant<TProps = {}>(
  testInfo: Omit<IsConformantOptions<TProps>, 'componentPath'> & { componentPath?: string },
) {
  const defaultOptions: Partial<IsConformantOptions<TProps>> = {
    disabledTests: [
      'kebab-aria-attributes',
      // v8 has a different prefix, and there's a setting for that now,
      // but a lot of components don't set a consistent/expected classname
      'component-has-static-classname',
      // v8 doesn't export classnames
      'component-has-static-classname-exported',
      // Will enable with appropriate overrides separately
      'consistent-callback-names',
      'consistent-callback-args',
      'component-has-static-classnames-object',
    ],
    componentPath: module!.parent!.filename.replace('.test', ''),
  };

  baseIsConformant(defaultOptions, testInfo);
}
