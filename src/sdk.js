export class AuthonomySDK {
    constructor(config) {
        this.appDid = config.appDid;
        this.appSecret = config.appSecret;
        this.serviceUrl = config.serviceUrl;
    }

    signUp(callback) {
        document.cookie = "origin=" + encodeURIComponent(window.location.origin) + ";path=/";
        const url = `${this.serviceUrl}/web/?type=login&app_did=${this.appDid}&app_secret=${this.appSecret}`;
        const windowFeatures = "width=500,height=600,resizable,scrollbars=yes,status=1";
        const popup = window.open(url, 'AuthonomySignUp', windowFeatures);
        window.addEventListener('message', receiveMessage, false);

        const receiveMessage = (event) => {
            console.log("event.origin", event.origin)
            if (event.origin !== this.serviceUrl) {
                console.error('Origin not allowed');
                return;
            }
            if (popup) {
                popup.close();
            }
            callback(event.data);
            window.removeEventListener('message', receiveMessage);
            // clear cookie
            document.cookie = "origin=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        };
    }

    getAccessToken(oauthCredential, policyCredential, callback) {
        const url = `${this.serviceUrl}/get-access-token?app_did=${encodeURIComponent(this.appDid)}&app_secret=${encodeURIComponent(this.appSecret)}`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                oauth_credential: oauthCredential,
                policy_credential: policyCredential
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Access token received:', data);
                callback(null, data);
            })
            .catch(error => {
                console.error('Error fetching access token:', error);
                callback(error, null);
            });
    }

    getAccessList(accessToken, callback) {
        const url = `${this.serviceUrl}/get-access-list?app_did=${encodeURIComponent(this.appDid)}&app_secret=${encodeURIComponent(this.appSecret)}`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Access list received:', data);
                callback(null, data);
            })
            .catch(error => {
                console.error('Error fetching access list:', error);
                callback(error, null);
            });
    }

    verifyAccess(accessToken, attribute, callback) {
        const url = `${this.serviceUrl}/verify-access?app_did=${encodeURIComponent(this.appDid)}&app_secret=${encodeURIComponent(this.appSecret)}&attribute=${encodeURIComponent(attribute)}`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Access verification result:', data);
                callback(null, data);
            })
            .catch(error => {
                console.error('Error verifying access:', error);
                callback(error, null);
            });
    }
}
