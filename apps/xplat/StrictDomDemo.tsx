import * as React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';

export const StrictDomDemo = (props: { cond?: boolean }) => {
  const { cond } = props;
  return <Text>Modify me!</Text>;
};
