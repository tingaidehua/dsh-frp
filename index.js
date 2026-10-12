import {
  frpStatus,
  installServer,
  installClient,
  writeClientConfig,
  startClientBackground,
} from './lib/frp-ops.js'
import { registerJsonTool } from './lib/register-json-tool.js'

export const name = 'dsh-frp'
export const inject = ['tools']

export function apply(ctx) {
  registerJsonTool(ctx, {
    name: 'frp.status',
    description: 'Show frps/frpc status. Adopts existing /etc/frp/frps.toml without changing token.',
    parameters: { type: 'object', properties: {}, additionalProperties: false },
    execute: async () => frpStatus(),
  })

  registerJsonTool(ctx, {
    name: 'frp.install_server',
    description: 'Install frps+systemd only if no existing toml. Never overwrites token unless force=true.',
    parameters: {
      type: 'object',
      properties: {
        force: { type: 'boolean', description: 'Dangerous: overwrite existing frps.toml' },
      },
      additionalProperties: false,
    },
    execute: async ({ force = false } = {}) => installServer({ force }),
  })

  registerJsonTool(ctx, {
    name: 'frp.install_client',
    description: 'Copy vendor frpc into ~/.config/dsh-frp (isolated from other frpc installs).',
    parameters: { type: 'object', properties: {}, additionalProperties: false },
    execute: async () => installClient(),
  })

  registerJsonTool(ctx, {
    name: 'frp.write_client_config',
    description: 'Write isolated frpc.toml with dsh-frp- proxy name. Requires FRP_TOKEN env.',
    parameters: {
      type: 'object',
      properties: {
        serverAddr: { type: 'string' },
        serverPort: { type: 'number' },
        localIp: { type: 'string' },
        localPort: { type: 'number' },
        remotePort: { type: 'number' },
        proxyName: { type: 'string' },
      },
      required: ['serverAddr', 'remotePort'],
      additionalProperties: false,
    },
    execute: async (args) => writeClientConfig(args),
  })

  registerJsonTool(ctx, {
    name: 'frp.start_client',
    description: 'Start background frpc using ~/.config/dsh-frp/frpc.toml',
    parameters: { type: 'object', properties: {}, additionalProperties: false },
    execute: async () => startClientBackground(),
  })

  console.log('[dsh-frp] tools registered')
}
