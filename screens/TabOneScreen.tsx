import * as React from 'react';
import { useState} from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import {Input, PricingCard} from 'react-native-elements'
import {format} from 'd3-format'

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

interface listing {
  purchasePrice: number,
  propertyTax: number,
  maintFee: number,
  sqft:number,
  notIncludedExpense: number,
  monthlyCostOfOwnership:number,
  downPaymentPercent:number,
  downPaymentAmount:number,
}

const initialListing:listing = {
  purchasePrice: 0,
  propertyTax: 0,
  maintFee: 0,
  sqft: 0,
  notIncludedExpense:0,
  monthlyCostOfOwnership:0,
  downPaymentPercent:20,
  downPaymentAmount:0,
}

const fmtMoney= format("$,")
const pricePerSqft = (purchasePrice:number, sqft:number):string => {
  const ppsft = Math.round(purchasePrice/sqft)
  return (!((sqft && ppsft) >0) || !ppsft || !sqft ? "-" : `$${ppsft}`)
}

const downPaymentAmount = (purchasePrice:number, downPaymentPercent:number) => {
  return fmtMoney(purchasePrice * downPaymentPercent/100)
}

const loanValue = (purchasePrice:number, downPaymentPercent:number) => {
  return fmtMoney(purchasePrice - purchasePrice * downPaymentPercent/100)
}


const TabOneScreen = ({ navigation }: RootTabScreenProps<'TabOne'>) => {
  const [listing, setListing] = useState(initialListing)
  return (
    <ScrollView>
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
    onChangeText={value => setListing({...listing, sqft: +value})}
      />


      <Input
    placeholder="Down Payment %"
    onChangeText={value => setListing({...listing, downPaymentPercent: +value})}
      />

    <Text>Price per Sqft</Text>
    <Text>{pricePerSqft(+listing.purchasePrice,+listing.sqft)}</Text>

    <Text>Down Payment</Text>
      <Text>{downPaymentAmount(+listing.purchasePrice,+listing.downPaymentPercent)}</Text>

    <Text>Loan Value</Text>
      <Text>{loanValue(+listing.purchasePrice,+listing.downPaymentPercent)}</Text>

      </View>
    </ScrollView>
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
