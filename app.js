

const request = require('request'),
    querystring = require('querystring');

class CoinhiveAPI {

    constructor (secret_key) {
        this.secret_key = secret_key;
    }

     static APIRequest(method, post, data, callback) {
        let req = {
            headers: {'content-type' : 'application/x-www-form-urlencoded'},
            url: 'https://api.coinhive.com/' + method
        };

        if(!post) {
            req.url += '?' + querystring.stringify(data);
        } else {
            req.form = data;
        }

        request.post(req, function(error, response, body){
            if(error) callback({status: 504, message:'Connection error'});
            else callback(body);
        });
     }

    verify(token, hashes, callback) {
        CoinhiveAPI.APIRequest('token/verify', true, {
            secret: this.secret_key,
            token: token,
            hashes: hashes
        }, callback);
    }

    balance(name, callback) {
        CoinhiveAPI.APIRequest('user/balance', false, {
            secret: this.secret_key,
            name: name
        }, callback);
    }

    withdraw(name, amount, callback) {
        CoinhiveAPI.APIRequest('user/withdraw', true, {
            secret: this.secret_key,
            name: name,
            amount: amount
        }, callback);
    }

    top(count, order, callback) {
        CoinhiveAPI.APIRequest('user/top', false, {
            secret: this.secret_key,
            count: count,
            order: order
        }, callback);
    }

    list(count, page, callback) {
        CoinhiveAPI.APIRequest('user/list', false, {
            secret: this.secret_key,
            count: count,
            page: page
        }, callback);
    }

    reset(name, callback) {
        CoinhiveAPI.APIRequest('user/reset', true, {
            secret: this.secret_key,
            name: name
        }, callback);
    }

    resetAll(callback) {
        CoinhiveAPI.APIRequest('user/reset-all', true, {
            secret: this.secret_key
        }, callback);
    }

    create(url, hashes, callback) {
        CoinhiveAPI.APIRequest('link/create', true, {
            secret: this.secret_key,
            url: url,
            hashes: hashes
        }, callback);
    }

    payout(callback) {
        CoinhiveAPI.APIRequest('stats/payout', false, {
            secret: this.secret_key
        }, callback);
    }

    site(callback) {
        CoinhiveAPI.APIRequest('stats/site', false, {
            secret: this.secret_key
        }, callback);
    }

    history(begin, end, callback) {
        CoinhiveAPI.APIRequest('stats/history', false, {
            secret: this.secret_key
        }, callback);
    }


}

module.exports = CoinhiveAPI;
