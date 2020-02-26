import { getComponentInfo } from '@fluentui/react-docs';

const fixturePaths = {
  ClassComponentPropsInline: './test/fixtures/ClassComponentPropsInline.tsx',
  ClassComponentPropsInterface: './test/fixtures/ClassComponentPropsInterface.tsx',
  ClassComponentPropsType: './test/fixtures/ClassComponentPropsType.tsx',
  AvatarRenderer: './test/fixtures/Avatar-Renderer.tsx'
};

describe('Get info from inline typed component', () => {
  it('creates an inline typed component', () => {
    const unit = 'ClassComponentPropsInline';
    const componentInfo = getComponentInfo(fixturePaths[unit]);

    expect(componentInfo.displayName).toEqual(unit);
  });
});

describe('getComponentWithInterface', () => {
  it('creates an Interface typed component', () => {
    const unit = 'ClassComponentPropsInterface';
    const componentInfo = getComponentInfo(fixturePaths[unit]);
    console.log(JSON.stringify(componentInfo, null, 2));
    expect(componentInfo.displayName).toEqual(unit);
  });
});

describe('getAvatarRendererSchema', () => {
  it('test tmp avatar component', () => {
    const unit = 'AvatarRenderer';
    const componentInfo = getComponentInfo(fixturePaths[unit]);
    console.log(JSON.stringify(componentInfo, null, 2));
    expect(componentInfo.displayName).toEqual(unit);
  });
});

describe('getComponentWithType', () => {
  it('creates an Type typed component', () => {
    const unit = 'ClassComponentPropsType';
    const componentInfo = getComponentInfo(fixturePaths[unit]);

    expect(componentInfo.displayName).toEqual(unit);
  });
});
