import { StyleSheet } from 'react-native';

enum TEXT_SIZE {
    SMALL = 14,
    MEDIUM = 18,
    LARGE = 22,
}

enum PADDING {
    SMALL = 8,
    DOUBLE = 16,
}

const BORDER_RADIUS = 3;

export const styles = StyleSheet.create({
    main: {
        flex: 1,
        margin: PADDING.DOUBLE,
        justifyContent: 'space-between',
    },
    center_main: {
        flex: 1,
        margin: PADDING.DOUBLE,
        justifyContent: 'center',
    },
    top_main: {
        flex: 1,
        margin: PADDING.DOUBLE,
    },
    joke: {
        backgroundColor: '#fff',
        borderRadius: BORDER_RADIUS,
        elevation: 1,
    },
    first: {
        padding: PADDING.SMALL,
        color: '#333',
        fontSize: TEXT_SIZE.MEDIUM,
    },
    second: {
        marginTop: PADDING.SMALL,
        padding: PADDING.SMALL,
        color: '#333',
        fontSize: TEXT_SIZE.MEDIUM,
    },
    input: {
        padding: PADDING.SMALL,
        color: '#333',
        fontSize: TEXT_SIZE.MEDIUM,
    },
    buttonContainer: {
        marginTop: PADDING.DOUBLE,
        padding: PADDING.DOUBLE,
        borderRadius: BORDER_RADIUS,
        elevation: 2,
    },
    buttonText: {
        color: '#fff',
        fontSize: TEXT_SIZE.SMALL,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    explanation: {
        marginBottom: PADDING.DOUBLE,
        textAlign: 'center',
        fontSize: TEXT_SIZE.SMALL,
    },
});
