import * as React from 'react';
import { List, ListItem } from '@fluentui/react-list-preview';

export const Default = () => (
  <List as="ul">
    <ListItem as="li">Asia</ListItem>
    <ListItem as="li">Africa</ListItem>
    <ListItem as="li">Europe</ListItem>
    <ListItem as="li">North America</ListItem>
    <ListItem as="li">South America</ListItem>
    <ListItem as="li">Australia/Oceania</ListItem>
    <ListItem as="li">Antarctica</ListItem>
  </List>
);
