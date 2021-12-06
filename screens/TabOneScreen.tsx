import * as React from 'react';
import { useState} from 'react';
import { StyleSheet } from 'react-native';
import {Input} from 'react-native-elements'

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

interface listing {
  purchasePrice: number,
  propertyTax: number,
  maintFee: number,
  sqrft:number,
  notIncludedExpense: number,
  monthlyCostOfOwnership:number
}

const initialListing:listing = {
  purchasePrice: 0,
  propertyTax: 0,
  maintFee: 0,
  sqrft: 0,
  notIncludedExpense:0,
  monthlyCostOfOwnership:0
}

const TabOneScreen = ({ navigation }: RootTabScreenProps<'TabOne'>) => {
  const [listing, setListing] = useState(initialListing)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Potential homes</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.body}>My catalogue</Text>
      <Text>{JSON.stringify(listing)}</Text>
      <Input
        placeholder="Purchase Price"
    onChangeText={value=> setListing({...listing, purchasePrice: +value})}

      />
      <Input
        placeholder="Square Footage"
    onChangeText={value => setListing({...listing, sqrft: +value})}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default TabOneScreen;
