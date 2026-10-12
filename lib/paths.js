import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const PLUGIN_ROOT = path.resolve(__dirname, '..')
export const VENDOR_DIR = path.join(PLUGIN_ROOT, 'vendor')

export function clientConfigDir() {
  return process.env.DSH_FRP_CONFIG_DIR
    || path.join(os.homedir(), '.config', 'dsh-frp')
}

export function serverFrpsToml() {
  return process.env.FRPS_TOML || '/etc/frp/frps.toml'
}

export function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
  return dir
}

export function vendorBinary(kind) {
  // kind: frps | frpc
  const plat = process.platform === 'win32' ? 'windows' : 'linux'
  const arch = process.arch === 'arm64' ? 'arm64' : 'amd64'
  const ext = process.platform === 'win32' ? '.exe' : ''
  return path.join(VENDOR_DIR, plat, arch, `${kind}${ext}`)
}
