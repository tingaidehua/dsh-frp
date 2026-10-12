#!/usr/bin/env bash
# Fetch frp 0.71.0 into vendor/ using CN mirrors first.
set -euo pipefail
VER=0.71.0
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TMP="${TMPDIR:-/tmp}/frp-vendor-cn-$$"
mkdir -p "$TMP"

LZU="https://mirror4.lzu.edu.cn/github-release/fatedier/frp/v${VER}"
GHP="https://ghproxy.net/https://github.com/fatedier/frp/releases/download/v${VER}"

fetch() {
  local name="$1" dest="$2"
  local url
  for url in "${LZU}/${name}" "${GHP}/${name}"; do
    echo "try $url"
    if curl -fsSL --connect-timeout 15 --max-time 180 -o "$dest" "$url"; then
      echo "ok $url"
      return 0
    fi
  done
  echo "FAILED $name" >&2
  return 1
}

mkdir -p "$ROOT/vendor/linux/amd64" "$ROOT/vendor/windows/amd64"

fetch "frp_${VER}_linux_amd64.tar.gz" "$TMP/linux.tgz"
tar -xzf "$TMP/linux.tgz" -C "$TMP"
cp "$TMP/frp_${VER}_linux_amd64/frps" "$ROOT/vendor/linux/amd64/frps"
cp "$TMP/frp_${VER}_linux_amd64/frpc" "$ROOT/vendor/linux/amd64/frpc"
chmod +x "$ROOT/vendor/linux/amd64/"*

fetch "frp_${VER}_windows_amd64.zip" "$TMP/win.zip"
unzip -qo "$TMP/win.zip" -d "$TMP/win"
cp "$TMP/win/frp_${VER}_windows_amd64/frps.exe" "$ROOT/vendor/windows/amd64/frps.exe"
cp "$TMP/win/frp_${VER}_windows_amd64/frpc.exe" "$ROOT/vendor/windows/amd64/frpc.exe"

rm -rf "$TMP"
ls -la "$ROOT/vendor/linux/amd64" "$ROOT/vendor/windows/amd64"
echo "vendor ready"
