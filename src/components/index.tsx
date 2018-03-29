import * as React from 'react';
import { Text, TextInput, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';

import { AntiJoke, styles } from '../utils';

interface ButtonProps {
    text: string;
    disabled?: boolean;
    action: () => void;
}

export const Button = (props: ButtonProps) => {
    const background = props.disabled ? '#bbb' : '#3c7';

    return (
        <Touchable
            style={[{ backgroundColor: background }, styles.buttonContainer]}
            disabled={props.disabled}
            onPress={props.action}>

            <Text style={styles.buttonText}>{props.text}</Text>
        </Touchable>
    )
}

interface InputProps {
    value: string;
    placeholder: string;
    onChange: (x: string) => void;
}

export const Input = (props: InputProps) => (
    <TextInput
        value={props.value}
        placeholder={props.placeholder}
        onChangeText={props.onChange}

        style={styles.input}
        multiline={true}
        underlineColorAndroid='transparent' />
);

interface JokeProps {
    joke: AntiJoke;
    shown: boolean;
}

export const Joke = (props: JokeProps) => (
    <View style={styles.joke}>
        <Text style={styles.first}>{props.joke.first_part}</Text>
        {props.shown && <Text style={styles.second}>{props.joke.second_part}</Text>}
    </View>
);
