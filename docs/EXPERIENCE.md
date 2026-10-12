# dsh-frp 国产化与踩坑

## 国内下载 frp 二进制

优先顺序：

1. 仓内 `vendor/`（推荐：目标机零外网依赖）
2. 兰大：`https://mirror4.lzu.edu.cn/github-release/fatedier/frp/v0.71.0/`
3. ghproxy：`https://ghproxy.net/https://github.com/fatedier/frp/releases/download/v0.71.0/...`
4. 最后才 GitHub 官方（国内常超时）

脚本：`scripts/fetch-vendor-cn.sh`

## 收养 vs 重装

腾讯云机上已有 `/etc/frp/frps.toml` 时：

- **禁止**默认重写 token（其他 Linux/Windows 隧道会瞬间全断）
- `frp.install_server` 发现文件即 `action=adopted`
- 客户端写到 `~/.config/dsh-frp/`，proxy 名必须以 `dsh-frp-` 开头

## 版本陷阱

- frp **0.71** 客户端/服务端都要 `transport.tcpMux = true`
- Windows vendor 是 `.exe`；Linux 无后缀且需 `chmod +x`
