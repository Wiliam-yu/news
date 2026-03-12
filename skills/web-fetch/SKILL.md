# SKILL.md - Web Fetch (Curl-based)

## What
使用 curl 进行网页内容获取和搜索，无需浏览器。

## Why
在无法使用浏览器的情况下，通过 API 和网页抓取获取信息。

## Tools

### 1. Web Search (使用 Bing)
```bash
# 搜索并提取链接
curl -s "https://www.bing.com/search?q=关键词" | grep -oP 'href="https?://[^"]+"' | grep -v "bing.com" | head -10
```

### 2. Web Fetch
```bash
# 获取网页内容
curl -s "URL" | head -100

# 获取并提取标题
curl -s "URL" | grep -oP '<title>[^<]+' | sed 's/<title>//'
```

### 3. GitHub Search
```bash
# 搜索 GitHub 仓库
curl -s -H "Authorization: token $GITHUB_TOKEN" \
  "https://api.github.com/search/repositories?q=关键词&sort=stars&order=desc" | \
  grep -oP '"full_name":"[^"]+"' | head -10
```

### 4. JSON API
```bash
# 获取 JSON 数据
curl -s "API_URL" | python3 -m json.tool
```

---

## Usage Examples

### 搜索信息
```bash
curl -s "https://www.bing.com/search?q=openclaw+multi+agent" | grep -oP 'href="https?://[^"]+"' | head -5
```

### 获取文档
```bash
curl -s "https://docs.openclaw.ai/quickstart" | grep -oP '<h1>[^<]+' | head -1
```

### 搜索 GitHub
```bash
curl -s -H "Authorization: token $GITHUB_TOKEN" \
  "https://api.github.com/search/code?q=openclaw+in:file+language:typescript" | \
  grep -oP '"full_name":"[^"]+"'
```

---

## Notes
- 需要网络连接
- 部分网站可能有访问限制
- GitHub API 有速率限制
