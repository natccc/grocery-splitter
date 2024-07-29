import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text } from "react-native";
export default function ItemsByDate({ route }){
    const { date } = route.params
    console.log(date)
    return (
        <Text>Items by date: {date}</Text>
    )
}