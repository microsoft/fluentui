import * as _ from 'lodash';
import * as React from 'react';
import { shallow } from 'enzyme';

import icons, { teamsIconClassNames } from '../../../../../../src/themes/teams/components/Icon/svg';
import { SvgIconSpecWithStyles } from '../../../../../../src/themes/teams/components/Icon/svg/types';

describe('Teams Theme Icon', () => {
  function testIcon(icon, props?) {
    const SvgIcon: any = (icon as SvgIconSpecWithStyles).icon;
    const component = shallow(
      <SvgIcon classes={{ outlinePart: 'TEST-OUTLINE', filledPart: 'TEST-FILLED' }} {...props} />,
    );

    const outlineByDynamicClass = component.find('.TEST-OUTLINE');
    const outlineByStaticClass = component.find(`.${teamsIconClassNames.outline}`);

    const filledByDynamicClass = component.find('.TEST-FILLED');
    const filledByStaticClass = component.find(`.${teamsIconClassNames.filled}`);

    expect(outlineByDynamicClass).toEqual(outlineByStaticClass);
    expect(filledByDynamicClass).toEqual(filledByStaticClass);
  }

  _.forEach(icons, (icon, iconName) => {
    test(`Teams theme icon '${iconName}' correctly sets static outline and filled classes`, () => {
      testIcon(icon);
      testIcon(icon, { rtl: true });
    });
  });
});
