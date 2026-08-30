const rawEndpoint = process.env.REACT_APP_SERVER_ENDPOINT || process.env.REACT_APP_SERVER_URL || "";
export const serverEndpoint = rawEndpoint.replace(/\/+$/, "");