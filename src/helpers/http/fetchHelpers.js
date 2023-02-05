import { endpoints } from "./endpoints"

const headers = {
    'Content-type': 'application/json'
}

const postHttp = async (endpoint, body) => {
    return await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
        headers
    }).then(res => res.json())
}

const patchHttp = async (endpoint, body) => {
    return await fetch(endpoint, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers
    }).then(res => res.json())
}

const getHttp = async (endpoint) => {
    return await fetch(endpoint, {
        method: 'GET',
        headers
    }).then(res => res.json())
}

const deleteHttp = async (creationId) => {
    return await fetch(`${endpoints.deleteCreation}/${creationId}`, {
        method: 'DELETE',
        headers
    }).then(res => {
        if(res.status !== 200) {
            return { status: res.status }
        }

        return res.json()
    })
}

export { postHttp, getHttp, deleteHttp, patchHttp }