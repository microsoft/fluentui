import { isConformant as baseIsConformant, IsConformantOptions } from '@fluentui/react-conformance';

export function isConformant<TProps>(testInfo: Omit<IsConformantOptions<TProps>, 'componentPath'>) {
  const defaultOptions = {
    asPropHandlesRef: true,
    componentPath: module!.parent!.filename.replace('.test', ''),
  };

  baseIsConformant<TProps>(defaultOptions, testInfo);
}
