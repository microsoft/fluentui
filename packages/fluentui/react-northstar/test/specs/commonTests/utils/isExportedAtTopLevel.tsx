import * as _ from 'lodash';
import * as FluentUI from 'src/index';

// ----------------------------------------
// Is exported or private
// ----------------------------------------

export default (constructorName: string) => {
  const isTopLevelAPIProp = _.has(FluentUI, constructorName);

  // require all components to be exported at the top level
  test('is exported at the top level', () => {
    const message = `'${constructorName}' must be exported at top level. Export it in 'src/index.js'.`;

    expect({ isTopLevelAPIProp, message }).toEqual({
      message,
      isTopLevelAPIProp: true,
    });
  });
};
