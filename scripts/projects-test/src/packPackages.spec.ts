import { createPackageResolutions } from './packPackages';

describe('createPackageResolutions', () => {
  it('creates Yarn Modern resolutions without unsupported glob patterns', () => {
    expect(
      createPackageResolutions({
        '@fluentui/react': '/tmp/fluentui-react.tgz',
        '@fluentui/react-components': '/tmp/fluentui-react-components.tgz',
      }),
    ).toEqual({
      '@fluentui/react': 'file:/tmp/fluentui-react.tgz',
      '@fluentui/react-components': 'file:/tmp/fluentui-react-components.tgz',
    });
  });
});
