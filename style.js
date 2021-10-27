import { StyleSheet } from 'react-native'

export const background = 'white'
export const primary = '#FF007F'
export const secondary = '#FF4500'
export const warning = '#FF003B'

export default StyleSheet.create({
    text: { fontFamily: "Quicksand_500Medium" },
    semibold: { fontFamily: "Quicksand_600SemiBold" },
    bold: { fontFamily: "Quicksand_700Bold" },
    item: {
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.15, shadowRadius: 2,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 50,
        borderRadius: 5,
        marginVertical: 8
    },
    headerTitleStyle: {
        fontFamily: "Quicksand_600SemiBold"
    },
    input: {
        fontFamily: "Quicksand_500Medium",
        padding: 10,
    },
})
