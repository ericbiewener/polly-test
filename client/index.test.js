const { Polly } = require("@pollyjs/core");
const FSPersister = require("@pollyjs/persister-fs");
const NodeHttpAdapter = require("@pollyjs/adapter-node-http");
const fetch = require("node-fetch");
const { request } = require('./index')

Object.defineProperty(window, "fetch", { value: fetch });
Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

let polly;

beforeEach(() => {
  // https://netflix.github.io/pollyjs/#/configuration
  polly = new Polly("All", {
    // logging: true,
    adapters: ["node-http"],
    persister: "fs",
    persisterOptions: {
      fs: {
        recordingsDir: "polly-recordings",
      },
    },
    matchRequestsBy: {
      headers: false,
      order: false,
    },
  });
});

afterEach(() => polly.stop());


test('make request', async () => {
  const rsp = await request()
  expect(rsp.data.trim()).toBe('Hello')
});
