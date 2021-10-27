import React from 'react'
import { Button } from 'react-native-elements'
import { primary } from '../style'

export default (props) => (
    <Button
        {...props}
        type="clear"
        titleStyle={{ fontFamily: "Quicksand_600SemiBold", color: primary }}
    />
)
