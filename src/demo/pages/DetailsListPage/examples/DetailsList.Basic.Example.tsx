/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {
  DetailsList
} from '../../../../index';
import { createListItems } from '../../../utilities/data';

let _items: any[];

export const DetailsListBasicExample = () => {
 _items = _items || createListItems(500);

  return (
    <DetailsList items={ _items } />
  );
};
