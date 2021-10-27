import React from 'react'
import { Button } from 'react-native-elements'
import { primary } from '../style'

export default (props) => (
    <Button
        {...props}
        titleStyle={{ fontFamily: "Quicksand_600SemiBold" }}
        buttonStyle={{ backgroundColor: primary }}
        style={{ marginTop: 18 }}
    />
)
