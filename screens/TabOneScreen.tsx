import * as React from "react";
import { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { format } from "d3-format";
import { Text, View, Input } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { CheckBox } from "react-native-elements";

interface listing {
  purchasePrice: number;
  propertyTax: number;
  maintFee: number;
  sqft: number;
  notIncludedExpense: number;
  monthlyCostOfOwnership: number;
  downPaymentPercent: number;
  downPaymentAmount: number;
  interestRate: number;
  schedule: "monthly" | "bi-weekly" | "bi-weekly accelerated";
}

const initialListing: listing = {
  purchasePrice: 888000,
  propertyTax: 0,
  maintFee: 0,
  sqft: 800,
  notIncludedExpense: 0,
  monthlyCostOfOwnership: 0,
  downPaymentPercent: 20,
  downPaymentAmount: 0,
  interestRate: 2.2,
  schedule: "bi-weekly"
};

interface resultType {
  label: string;
  result: number;
}

const fmtMoney = format("$,");
const pricePerSqft = (purchasePrice: number, sqft: number) => {
  const ppsft = Math.round(purchasePrice / sqft);
  return !((sqft && ppsft) > 0) || !ppsft || !sqft ? "$0" : fmtMoney(ppsft);
};

const downPaymentAmount = (
  purchasePrice: number,
  downPaymentPercent: number
) => {
  return fmtMoney((purchasePrice * downPaymentPercent) / 100);
};

const loanValue = (purchasePrice: number, downPaymentPercent: number) => {
  return fmtMoney(purchasePrice - (purchasePrice * downPaymentPercent) / 100);
};

const TabOneScreen = ({ navigation }: RootTabScreenProps<"TabOne">) => {
  const [listing, setListing] = useState(initialListing);
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Evaluate Potential Home</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />

        <View style={styles.flexContainer}>
          <View style={styles.row}>
            <Input
              label="Purchase Price"
              placeholder="$888,000"
              onChangeText={value =>
                value && setListing({ ...listing, purchasePrice: +value })
              }
              darkColor="#eee"
              lightColor="rgba(255,255,255,0.1)"
            />
          </View>
        </View>

        <View style={styles.flexContainer}>
          <View style={styles.row}>
            <Input
              label="Square Footage"
              placeholder="800sqft"
              onChangeText={value =>
                value && setListing({ ...listing, sqft: +value })
              }
              darkColor="#eee"
              lightColor="rgba(255,255,255,0.1)"
            />
          </View>
        </View>

        <View style={styles.flexContainer}>
          <View style={styles.row}>
            <Input
              label="Down Payment"
              placeholder="20%"
              onChangeText={value =>
                value && setListing({ ...listing, downPaymentPercent: +value })
              }
              darkColor="#eee"
              lightColor="rgba(255,255,255,0.1)"
            />
          </View>
        </View>

        <View style={styles.flexContainer}>
          <View style={styles.interestContainer}>
            <View
              style={{
                flex: 1,
                padding: 5,
                minWidth: 30
              }}
            >
              <Input
                label="Interest Rate"
                placeholder="2.2%"
                onChangeText={value =>
                  value && setListing({ ...listing, interestRate: +value })
                }
                darkColor="#eee"
                lightColor="rgba(255,255,255,0.1)"
              />
            </View>
            <View
              style={{
                flex: 3,
                flexDirection: "row",
                flexWrap: "wrap"
              }}
            >
              <View style={{ flex: 3, minWidth: 100 }}>
                <CheckBox
                  title="Monthly"
                  checked={listing.schedule === "monthly" ? true : false}
                  onPress={() =>
                    setListing({ ...listing, schedule: "monthly" })
                  }
                />
              </View>
              <View style={{ flex: 3, minWidth: 110 }}>
                <CheckBox
                  title="Bi-weekly"
                  checked={listing.schedule === "bi-weekly" ? true : false}
                  onPress={() =>
                    setListing({ ...listing, schedule: "bi-weekly" })
                  }
                />
              </View>
              <View style={{ flex: 4, minWidth: 140 }}>
                <CheckBox
                  title="Bi-weekly accel."
                  checked={
                    listing.schedule === "bi-weekly accelerated" ? true : false
                  }
                  onPress={() =>
                    setListing({
                      ...listing,
                      schedule: "bi-weekly accelerated"
                    })
                  }
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.resultGroupContainer}>
          <Result
            label="Price per Sqft"
            result={pricePerSqft(+listing.purchasePrice, +listing.sqft)}
          />

          <Result
            label="Down Payment"
            result={downPaymentAmount(
              +listing.purchasePrice,
              +listing.downPaymentPercent
            )}
          />

          <Result
            label="Loan Value"
            result={loanValue(
              +listing.purchasePrice,
              +listing.downPaymentPercent
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

function Result(props: resultType) {
  return (
    <View style={styles.resultContainer}>
      <Text style={styles.resultLabel}>{props.label}: </Text>
      <Text style={styles.result}>{props.result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 20
  },
  body: {
    fontSize: 16
  },
  resultGroupContainer: { flex: 1 },
  resultContainer: { flex: 1, flexDirection: "row", padding: 5 },
  resultLabel: { fontSize: 18 },
  result: { fontSize: 20, paddingHorizontal: 5 },
  flexContainer: { flex: 1, padding: 10 },
  row: { flexDirection: "row", flexWrap: "wrap" },
  interestContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    width: "100%",
    paddingVertical: 10,
    borderWidth: 1,
    borderStyle: "dotted",
    borderColor: "grey"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  }
});

export default TabOneScreen;
