import React from 'react';
import { Text } from 'react-native';

function StyledText({ children, style, ...props }) {
    return (
        <Text {...props} style={{ fontFamily: "Quicksand_500Medium", ...style }}>
            {children}
        </Text>
    )
}

export default StyledText
