async function req(
    endpoint,
    {
        get_data = undefined,
        data = undefined,
        method = 'POST',
        headers = new Headers({ 'Content-Type': 'application/json' }),
        mode = 'cors',
        credentials = 'same-origin',
        cache = undefined,
        redirect = 'follow',
        referrer = undefined,
        integrity = undefined,
    } = {}
) {
    if (get_data) {
        endpoint = endpoint + "?" + Object.keys(get_data).map(d => { return `${encodeURIComponent(d)}=${encodeURIComponent(get_data[d])}` }).join('&');
    }
    var req = new Request(
        endpoint,
        {
            method: method,
            headers: headers,
            mode: mode,
            credentials: credentials,
            cache: cache,
            redirect: redirect,
            referrer: referrer,
            integrity: integrity,
            body: data ? JSON.stringify(data) : data,
        }
    );

    //try {

    const resp = await fetch(req);
    /* if (!resp.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } */
    return await resp.json();

    /*}
    catch (error) {
        console.error('Fetch error:', error);
    }*/
}

async function preq(
    endpoint,
    path_data,
    {
        get_data = undefined,
        data = undefined,
        method = 'POST',
        headers = new Headers({ 'Content-Type': 'application/json' }),
        mode = 'cors',
        credentials = 'same-origin',
        cache = undefined,
        redirect = 'follow',
        referrer = undefined,
        integrity = undefined,
    } = {}
) {
    for (let path in path_data) {
        endpoint = endpoint.replace(`NONE_${path}`, encodeURIComponent(path_data[path]));
    }
    return req(
        endpoint,
        {
            get_data: get_data,
            data: data,
            method: method,
            headers: headers,
            mode: mode,
            credentials: credentials,
            cache: cache,
            redirect: redirect,
            referrer: referrer,
            integrity: integrity,
        }
    );
}

