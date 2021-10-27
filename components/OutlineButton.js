import React from 'react'
import { Button } from 'react-native-elements'
import { primary } from '../style'

export default (props) => (
    <Button
        {...props}
        type="outline"
        titleStyle={{ fontFamily: "Quicksand_500Medium", color: primary }}
        buttonStyle={{ borderColor: primary, width: 320 }}
        style={{ marginTop: 18 }}
    />
)
