import * as React from 'react';
import { Nav, NavCategory, NavCategoryItem, NavItem, NavSubItem, NavSubItemGroup } from '@fluentui/react-nav-preview';

export const WithNestedSubItemsDefaultSelection = () => {
  const someClickHandler = () => {
    console.log('someClickHandler');
  };

  return (
    <Nav defaultSelectedValue={'7'} defaultSelectedCategoryValue={'4'}>
      <NavItem href="https://www.microsoft.com" target="_blank" onClick={someClickHandler} value="1">
        First
      </NavItem>
      <NavItem value="2">Second</NavItem>
      <NavItem value="3">Third</NavItem>
      <NavCategory value="4">
        <NavCategoryItem>NavCategoryItem 1</NavCategoryItem>
        <NavSubItemGroup>
          <NavSubItem href="https://www.microsoft.com" onClick={someClickHandler} target="_blank" value="5">
            Five
          </NavSubItem>
          <NavSubItem value="6">Six</NavSubItem>
          <NavSubItem value="7">Seven</NavSubItem>
        </NavSubItemGroup>
      </NavCategory>
      <NavCategory value="8">
        <NavCategoryItem>NavCategoryItem2</NavCategoryItem>
        <NavSubItemGroup>
          <NavSubItem value="9">Nine</NavSubItem>
          <NavSubItem value="10">Ten</NavSubItem>
          <NavSubItem value="11">Eleven</NavSubItem>
        </NavSubItemGroup>
      </NavCategory>
      <NavCategory value="12">
        <NavCategoryItem>NavCategoryItem3</NavCategoryItem>
        <NavSubItemGroup>
          <NavSubItem value="13">Thirteen</NavSubItem>
          <NavSubItem value="14">Fourteen</NavSubItem>
          <NavSubItem value="15">Fifteen</NavSubItem>
        </NavSubItemGroup>
      </NavCategory>
      <NavCategory value="16">
        <NavCategoryItem>NavCategoryItem4</NavCategoryItem>
        <NavSubItemGroup>
          <NavSubItem value="17">Seventeen</NavSubItem>
          <NavSubItem value="18">Eighteen</NavSubItem>
          <NavSubItem value="19">Nineteen</NavSubItem>
        </NavSubItemGroup>
      </NavCategory>
    </Nav>
  );
};
