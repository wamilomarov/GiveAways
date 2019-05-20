import EventEmitter from "events";
import axios from "axios";

// const webAuth = new auth0.WebAuth({
//     domain: authConfig.domain,
//     redirectUri: `${window.location.origin}/callback`,
//     clientID: authConfig.clientId,
//     responseType: 'id_token',
//     scope: 'openid profile email'
// });

const localStorageKey = 'loggedIn';
const loginEvent = 'loginEvent';

class AuthService extends EventEmitter {
    idToken = null;
    profile = null;
    tokenExpiry = null;
    access_token = null;

    // Starts the user login flow
    login(customState) {
        // webAuth.authorize({
        //     appState: customState
        // });
    }

    setAccessToken(access_token) {
        this.access_token = access_token;
        localStorage.setItem('access_token', access_token);
    }

    // Handles the callback request from Auth0
    handleAuthentication() {
        let auth = this;
        axios.get('https://api.instagram.com/v1/users/self/', {
            params: {
                access_token: this.access_token
            }
        })
            .then(function (response) {
                auth.localLogin(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    localLogin(authResult) {

        if (authResult.meta.code == 200) {
            authResult.data.instagram_id = authResult.data.id;
            delete authResult.data.id;
            this.profile = authResult.data;

            localStorage.setItem(localStorageKey, 'true');

            this.emit(loginEvent, {
                loggedIn: true,
                profile: authResult.data,
                state: authResult.appState || {}
            });
        }
    }

    logOut() {
        localStorage.removeItem(localStorageKey);
        localStorage.removeItem('access_token');
        localStorage.removeItem('profile');

        this.idToken = null;
        this.tokenExpiry = null;
        this.profile = null;

        // webAuth.logout({
        //     returnTo: window.location.origin
        // });

        this.emit(loginEvent, {loggedIn: false});
        window.location.replace(window.location.origin);
    }

    isAuthenticated() {
        if (localStorage.getItem(localStorageKey) === 'true') {
            this.access_token = localStorage.getItem('access_token');
            this.profile = JSON.parse(localStorage.getItem('profile'));
            return true;
        } else {
            return false;
        }
    }

}

export default new AuthService();