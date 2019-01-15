import React from 'react';
import { Text, TextInput, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';

import { AntiJoke, styles } from '../utils';

interface ButtonProps {
    text: string;
    disabled?: boolean;
    action: () => void;
}

export const Button = ({ text, disabled, action }: ButtonProps) =>
    <Touchable
        disabled={disabled}
        onPress={action}
        style={{
            backgroundColor: disabled ? '#bbb' : '#3c7',
            ...styles.buttonContainer,
        }}
    >
        <Text style={styles.buttonText}>{text}</Text>
    </Touchable>

interface InputProps {
    value: string;
    placeholder: string;
    onChange: (x: string) => void;
}

export const Input = (props: InputProps) =>
    <TextInput
        multiline
        value={props.value}
        placeholder={props.placeholder}
        onChangeText={props.onChange}
        style={styles.input}
        underlineColorAndroid='transparent'
    />

interface JokeProps {
    joke: AntiJoke;
    shown: boolean;
}

export const Joke = ({ joke, shown }: JokeProps) =>
    <View style={styles.joke}>
        <Text style={styles.first}>{joke.first_part}</Text>
        {shown && <Text style={styles.second}>{joke.second_part}</Text>}
    </View>
