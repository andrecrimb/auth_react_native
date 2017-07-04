import React, {Component} from 'react';
import {View} from 'react-native';
import { Header, Button, CardSection, Spinner } from './components/common';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';

class App extends Component{

    state = { loggedIn: null };

    componentWillMount(){
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: 'AIzaSyCpVKEf9s3156usVhoqMix3UsGvSq_fWh0',
                authDomain: 'authentication-163c2.firebaseapp.com',
                databaseURL: 'https://authentication-163c2.firebaseio.com',
                projectId: 'authentication-163c2',
                storageBucket: 'authentication-163c2.appspot.com',
                messagingSenderId: '1009535665167'
            });
        }
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                this.setState({ loggedIn: true });
            } else{
                this.setState({ loggedIn: false });
            }
        });

    }

    renderContent(){

        switch (this.state.loggedIn){
            case true:
                return(
                    <CardSection>
                        <Button onPress={() => firebase.auth().signOut()}>
                            Log Out
                        </Button>
                    </CardSection>
                );
            case false:
                return <LoginForm />;
            default:
                return <Spinner/>
        }

    }

    render(){
        return (
            <View>
                <Header headerText="Authentication"/>

                    { this.renderContent() }

            </View>
        );
    }
}

export default App;