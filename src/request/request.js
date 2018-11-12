// Implementação simples e mínima da Fetch API,
// com apenas suporte a respostas `JSON` e `text`,
// queries por objeto e também uma API amigável
// com "atalhos" para os métodos `GET` e `POST`.

import { querifySimple } from '../utils';

const defaultOptions = {
  method: 'GET',
  headers: []
};

const isPath = (path = '/') => {
  const protocol = path.slice(8);

  return !(protocol === 'http://' || protocol === 'https://');
};

function createResponse(request) {
  const all = [];
  const keys = [];
  const headers = {};
  const heardersRegExp = /^(.*?):[^\S\n]*([\s\S]*?)$/gm;
  let header = undefined;

  request.getAllResponseHeaders()
    .replace(heardersRegExp, (match, key, value) => {
      header = headers[key];
      headers[key] = header ? `${header},${value}` : value;

      all.push([key, value]);
      keys.push(key = key.toLowerCase());
    });

  return {
    ok: (request.status/100|0) == 2,
    status: request.status,
    statusText: request.statusText,
    url: request.responseURL,
    text: () => Promise.resolve(request.responseText),
    json: () => Promise.resolve(JSON.parse(request.responseText)),
    headers: {
      keys: () => keys,
      entries: () => all,
      get: key => headers[key.toLowerCase()],
      has: key => key.toLowerCase() in headers
    }
  };
}

function request(url = '/', options = {}) {
	return new Promise((resolve, reject) => {

    // Cria uma nova instância do XMLHttpRequest em cada requisição.
    const request = new XMLHttpRequest();
    const config = Object.assign(defaultOptions, options);
    const query = querifySimple(options.query || options.params);

    // Inicia a requisição.
		request.open(config.method || 'get', `${url}${query}`, true);

    // Configura os headers do request.
		for (let i in config.headers) {
			request.setRequestHeader(i, config.headers[i]);
		}

    // Configura os handlers de sucesso e erro.
    request.onerror = reject;
		request.onload = () => {
			resolve(createResponse(request));
		};

    // Envia a requisição.
		request.send(config.body || null);
	});
}

// "Atalhos" para os métodos `GET` e `POST`.
const get = (path, options) => request(path, { ...options, method: 'GET' });
const post = (path, options) => request(path, { ...options, method: 'POST' });

export default function Request(baseURL, options) {
  return Object.freeze({
    get(path, options) {
      if (isPath(path)) {
        return get(`${baseURL}${path}`, options);
      }

      return get(path, options);
    },
    post(path) {
      if (isPath) {
        return post(`${baseURL}${path}`, options);
      }

      return post(path, options);
    }
  });
}
