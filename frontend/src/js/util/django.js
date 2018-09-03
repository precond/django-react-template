/**
 * A utility class for handling REST calls to a Django backend implemented with the
 * Django REST framework. Handles the CSRF token forwarding as well as response
 * status checking. Uses window.fetch() to make the AJAX calls.
 */
export default class DjangoAPI {
    /**
     * GETs the resource from the given URL and handles the response. Returns a promise
     * which resolves to {status: <status>, statusText: <text>, data: <data>} object
     * if the request was successful.
     */
    static get(url) {
        return DjangoAPI._call_fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        });
    }


    /**
     * POSTs the given object to the given URL as JSON and handles the response. Returns a
     * promise which resolves to {status: <status>, statusText: <text>, data: <data>} object
     * if the request was successful.
     */
    static post(url, data, method='POST') {
        return DjangoAPI._call_fetch(url, {
            method: method,
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': DjangoAPI.getCSRFCookie()
            },
            body: JSON.stringify(data)
        });
    }


    /**
     * PUTs the given object to the given URL as JSON and handles the response. Returns a
     * promise which resolves to {status: <status>, statusText: <text>, data: <data>} object
     * if the request was successful.
     */
    static put(url, data) {
        return this.post(url, data, 'PUT');
    }


    /**
     * Returns the value of Django CSRF cookie (remember to put @ensure_csrf_cookie into
     * the Django view that returns the React app page).
     */
    static getCSRFCookie() {
        if (!document.cookie) {
            return null;
        }
        const token = document.cookie.split(';')
            .map(c => c.trim())
            .filter(c => c.startsWith('csrftoken='));

        if (token.length === 0) {
            return null;
        }
        return decodeURIComponent(token[0].split('=')[1]);
    }


    /**
     * Parses the fetch() response into a form that has the JSON parsed and retains the
     * status code and status text. Because response.text() and response.json() return
     * promises rather than the actual value, the original response status and value are
     * lost if those are used. Furthermore, response.json() promise fails if the response
     * is empty (eg a 204 response), so we must be able to check the response before
     * attempting to parse JSON.
     */
    static parseResponse(response) {
        const parsedResponse = {
            status: response.status,
            statusText: response.statusText
        };

        return response.text().then(function(text) {
            if (text) {
                parsedResponse.data = JSON.parse(text);
            }
            return parsedResponse;
        });
    }


    /**
     * Checks the response status and rejects it if is not 2xx. The error message in the reject
     * is the "detail" from body JSON if present, otherwise the original response status text.
     */
    static checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;

        } else {
            throw new Error(response.data && response.data.detail ? response.data.detail : response.statusText);
        }
    }


    static _call_fetch(url, options) {
        return fetch(url, options)
            .then(DjangoAPI.parseResponse)
            .then(DjangoAPI.checkStatus);
    }
}
