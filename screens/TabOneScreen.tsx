import * as React from 'react';
import { useState} from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import {Input, PricingCard} from 'react-native-elements'
import {format} from 'd3-format'
import CurrencyInput from 'react-currency-input-field'

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
  purchasePrice: 888000,
  propertyTax: 0,
  maintFee: 0,
  sqft: 800,
  notIncludedExpense:0,
  monthlyCostOfOwnership:0,
  downPaymentPercent:20,
  downPaymentAmount:0,
}

const fmtMoney= format("$,")
const pricePerSqft = (purchasePrice:number, sqft:number):string => {
  const ppsft = Math.round(purchasePrice/sqft)
  return (!((sqft && ppsft) >0) || !ppsft || !sqft ? "$0" : fmtMoney(ppsft))
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

      <View style={styles.flexContainer}>
      <View style={styles.row}>
      <Text style={styles.inputTextLabel}> Purchase Price</Text>
      <CurrencyInput

    placeholder="$888,000"
    onValueChange ={(value) => value && setListing({...listing, purchasePrice: +value})}
    allowDecimals={false}
    prefix={"$"}
    step={1000}

      />
      </View>
      </View>


      <View style={styles.flexContainer}>
      <View style={styles.row}>
      <Text style={styles.inputTextLabel}>Square Footage</Text>
      <CurrencyInput

    placeholder="800sqft"
    onValueChange={value => value && setListing({...listing, sqft: +value})}
    allowDecimals={false}
    suffix={"sqft"}
    step={5}

      />
      </View>
      </View>


      <View style={styles.flexContainer}>
      <View style={styles.row}>
      <Text style={styles.inputTextLabel}>Down Payment</Text>
      <CurrencyInput

    placeholder="20%"
    onValueChange = {value => value && setListing({...listing, downPaymentPercent: +value})}
    allowDecimals={true}
    suffix={"%"}
    step={1}

      />
      </View>
      </View>

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
  flexContainer: {flex:1, padding:10},
  row: {flexDirection:"row", flexWrap:"wrap"},
  inputTextLabel:{padding:10},
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default TabOneScreen;
