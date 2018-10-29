import React from 'react';
import { PureComponent } from 'react';
import {
    ActivityIndicator,
    Alert,
    Text,
    View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    Button,
    Input,
} from '../components';
import {
    strings,
    styles,
    URLBASE,
} from '../utils';
import { isResponseOk } from '../utils/validators';

interface State {
    sent: boolean;
    first_part: string;
    second_part: string;
}

export class SendScreen extends PureComponent<{}, State> {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => <Icon
            name='pencil'
            size={25}
            color={tintColor} />,
    };

    state: State = {
        sent: false,
        first_part: '',
        second_part: '',
    };

    render() {
        return (
            <View style={styles.top_main}>
                <Text style={styles.explanation}>{strings.lbl_explain}</Text>

                <View style={styles.joke}>
                    <Input
                        value={this.state.first_part}
                        onChange={first_part => this.setState({ first_part })}
                        placeholder={strings.lbl_first_part} />

                    <Input
                        value={this.state.second_part}
                        onChange={second_part => this.setState({ second_part })}
                        placeholder={strings.lbl_second_part} />
                </View>

                <Button
                    text={strings.btn_send}
                    action={this.onSend}
                    disabled={this.state.sent} />

                {this.state.sent && <ActivityIndicator style={{ margin: 32 }} />}
            </View>
        );
    }

    private onSend = () => {
        this.setState({ sent: true });

        const params = {
            method: 'POST',
            body: `first_part=${this.state.first_part}&second_part=${this.state.second_part}`,
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
        };

        fetch(URLBASE + '/send', params)
            .then(isResponseOk)
            .then(this.onSubmitSuccess)
            .catch(this.onSubmitError);
    }

    private onSubmitError = () => {
        this.setState({ sent: false });
        Alert.alert(strings.error_sent_title, strings.error_sent_body);
    }

    private onSubmitSuccess = () => {
        this.setState({
            sent: false,
            first_part: '',
            second_part: '',
        });
    }
}
