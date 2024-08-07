async function get_json(resp) {
    if (!resp.ok) {
        throw new Error(`HTTP error, status: ${resp.status}<br>${await resp.text()}`);
    }
    return { json: await resp.json(), resp: resp };
}

async function get_text(resp) {
    if (!resp.ok) {
        throw new Error(`HTTP error, status: ${resp.status}<br>${await resp.text()}`);
    }
    return { text: await resp.text(), resp: resp };
}

async function req(
    endpoint,
    {
        get_data = undefined,
        data = undefined,
        json = undefined,
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
            body: json ? JSON.stringify(json) : data,
        }
    );

    const resp = await fetch(req);
    return resp;
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

