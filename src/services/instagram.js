import axios from "axios";

export default {
    followProfile(profile_id) {
        let uri = "https://api.instagram.com/v1/users/" + profile_id +
            "/relationship?access_token=" + localStorage.getItem('access_token');

        console.log(uri);

        axios.post(uri, {
            action: 'follow'
        })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            });
    }
}