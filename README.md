# dsh-frp

DeepSeek Harness plugin for **frps** (server) and **frpc** (client).

## Safety

- If `/etc/frp/frps.toml` already exists, `frp.install_server` **adopts** it and does **not** rewrite token or port ranges.
- Client configs live in `~/.config/dsh-frp/` with proxy names prefixed `dsh-frp-`, so other tunnels are untouched.
- Secrets come from environment / `~/.env` (`FRP_TOKEN`, dashboard password). Never committed.

## Install

```bash
dsh plugin --profile web add ./dsh-frp
# or
dsh plugin --profile web add github:tingaidehua/dsh-frp
```

Tested against `@deepseek-ai/dsh@0.2.1-alpha.2`.

## Vendor binaries

`vendor/linux/amd64/{frps,frpc}` and `vendor/windows/amd64/{frps.exe,frpc.exe}` (frp 0.71.0).
