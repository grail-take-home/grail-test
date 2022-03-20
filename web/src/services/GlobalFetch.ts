export const GlobalFetch = <T>(options: {
  url: string;
  method?: string;
  body?: any;
}): Promise<T> => {
  return fetch(options.url, {
    method: options.method || "GET",
    body: options.body ? JSON.stringify(options.body) : undefined,
    headers: {
      ["content-type"]: "application/json",
      ["Access-Control-Allow-Credentials"]: "true",
    },
    credentials: "include",
  }).then((res) => res.json());
};
