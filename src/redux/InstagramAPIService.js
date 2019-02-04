import axios from 'axios';
import { getUserInfo } from 'provider/utils';

export default class InstagramAPIService {

    constructor() {
        this.axios = axios.create({
            baseURL: 'https://api.instagram.com/v1',
            timeout: 4000
        });
        this.accessToken = getUserInfo().token || localStorage.getItem('insta_token');
    }

    get(path) {
        return this.axios.get(path + `?access_token=${this.accessToken}`)
    }
}