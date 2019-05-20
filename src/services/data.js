import axios from "axios";

const apiClient = axios.create({
    baseURL: `http://localhost:8000`,
    withCredentials: false, // This is the default
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/form-data'
    },
    timeout: 10000
});

export default {

    syncUser(profile){
        return apiClient.post("/users/", profile);
    },
    postGiveaway(data){
        return apiClient.post("/giveaways/", data);
    },
    getGiveaways(perPage, page) {
        return apiClient.get('/giveaways?_limit=' + perPage + '&_page=' + page)
    },
    getGiveaway(id) {
        return apiClient.get('/giveaways/' + id)
    },
    postEvent(event) {
        return apiClient.post('/events', event)
    }
}
