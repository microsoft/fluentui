/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactTestUtils from 'react-addons-test-utils';

let { expect } = chai;

import { Menu } from './Menu';
import { IMenuItemProps } from './MenuItem.Props';

describe('Menu', () => {

    it('renders without throwing an error', () => {
        let threwException: boolean = false;

        try {
            const items: IMenuItemProps[] = [
                { name: 'TestText 1', key: 'TestKey1' },
                { name: 'TestText 2', key: 'TestKey2' },
                { name: 'TestText 3', key: 'TestKey3' },
                { name: 'TestText 4', key: 'TestKey4' },
            ];

            ReactTestUtils.renderIntoDocument<Menu>(
                <Menu
                    items={ items }
                    />
            );
        } catch (e) {
            threwException = true;
        }
        expect(threwException).to.be.false;
    });

});