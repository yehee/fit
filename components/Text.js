import React from 'react'
import { Text } from 'react-native'

export default ({ children, style, ...props }) => (
    <Text {...props} style={{ ...style, fontFamily: 'Quicksand_500Medium' }}> {children}</Text >
)
