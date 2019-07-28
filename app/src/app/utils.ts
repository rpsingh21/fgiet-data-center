export const toQueryString = object =>
    "?" +
    Object.keys(object)
        .map(key => `${key}=${object[key].toString()}`)
        .join("&");

export const objectKeys = Object.keys;
