import { isConformant as baseIsConformant } from '@fluentui/react-conformance';
import type { IsConformantOptions, TestObject } from '@fluentui/react-conformance';
import griffelTests from '@fluentui/react-conformance-griffel';

export function isConformant<TProps = {}>(
  testInfo: Omit<IsConformantOptions<TProps>, 'componentPath'> & { componentPath?: string },
) {
  const defaultOptions: Partial<IsConformantOptions<TProps>> = {
    componentPath: module!.parent!.filename.replace('.test', ''),
    extraTests: griffelTests as TestObject<TProps>,

    // Field-specific defaults
    primarySlot: 'control' as keyof TProps,
    testOptions: testInfo.testOptions?.['has-static-classnames']
      ? undefined
      : {
          'has-static-classnames': [
            {
              props: {
                label: 'label text',
                validationState: 'error',
                validationMessage: 'validation message text',
                hint: 'hint text',
              },
            },
          ],
        },
  };

  baseIsConformant(defaultOptions, testInfo);
}
