import React from 'react';
import { PureComponent } from 'react';
import {
    ActivityIndicator,
    Text,
    View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    Button,
    Joke,
} from '../components';
import {
    AntiJoke,
    ServerResponse,
    strings,
    styles,
    URLBASE,
} from '../utils';
import { isResponseOk } from '../utils/validators';

enum LoadState {
    Loading,
    Got,
    Error,
}

interface State {
    jokes: Array<AntiJoke>;
    shown: boolean;
    liked: boolean;
    loadState: LoadState;
}

export class RandomScreen extends PureComponent<{}, State> {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => <Icon
            name='dice-5'
            size={25}
            color={tintColor} />,
    };

    state: State = {
        jokes: [],
        shown: false,
        liked: false,
        loadState: LoadState.Loading,
    };

    componentDidMount() {
        this.loadNewJokes();
    }

    render() {
        if (this.state.loadState === LoadState.Loading) {
            return (
                <View style={styles.center_main}>
                    <ActivityIndicator />
                </View>
            );
        } else if (this.state.loadState === LoadState.Error) {
            return (
                <View style={styles.center_main}>
                    <Text style={styles.explanation}>{strings.lbl_network_error}</Text>
                    <Button text={strings.btn_again} action={this.loadNewJokes} />
                </View>
            );
        }

        return (
            <View style={styles.main}>
                <Joke joke={this.state.jokes[0]} shown={this.state.shown} />

                <View>
                    {this.state.shown || <Button text={strings.btn_show} action={this.onShow} />}
                    {this.state.shown && <Button text={strings.btn_next} action={this.onNext} />}
                    {this.state.shown && <Button text={strings.btn_like} action={this.onLike} disabled={this.state.liked} />}
                </View>
            </View>
        );
    }

    private loadNewJokes = (count: number = 0) => {
        if (count === 2) {
            this.setState({ loadState: LoadState.Error, jokes: [] });
            return;
        }

        this.setState({ loadState: LoadState.Loading, shown: false });

        fetch(URLBASE + '/random')
            .then(res => res.json())
            .then((res: ServerResponse) => this.setState({
                jokes: res.items,
                loadState: LoadState.Got,
            }))
            .catch(() => this.loadNewJokes(count + 1));
    }

    private onShow = () => this.setState({ shown: true });

    private onLike = () => {
        this.setState({ liked: true });

        const params = {
            method: 'POST',
            body: `id=${this.state.jokes[0].id}`,
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
        };

        fetch(URLBASE + '/vote', params)
            .then(isResponseOk)
            .catch(this.onLikeFail);
    }

    private onLikeFail = () => this.setState({ liked: false });

    private onNext = () => {
        if (this.state.jokes.length === 1) {
            this.loadNewJokes();
            return;
        }

        this.setState({
            jokes: this.state.jokes.filter((_, i) => i !== 0),
            shown: false,
            liked: false,
        });
    }
}
