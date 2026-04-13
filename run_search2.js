const { execSync } = require('child_process');
const path = require('path');

const scriptPath = path.join(process.env.HOME, '.openclaw/workspace/skills/brave-search/search.js');
const query = process.argv[2] || '小红书 美国旅行 约伴 组队';
const args = process.argv.slice(3).join(' ');

try {
  const result = execSync(`node "${scriptPath}" "${query}" ${args}`, {
    encoding: 'utf-8',
    cwd: path.dirname(scriptPath)
  });
  console.log(result);
} catch (e) {
  console.error(e.message);
}