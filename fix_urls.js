const fs = require('fs');
const path = require('path');

function walkSync(dir, filelist = []) {
  if (!fs.existsSync(dir)) return filelist;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const dirFile = path.join(dir, file);
    const dirent = fs.statSync(dirFile);
    if (dirent.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        filelist = walkSync(dirFile, filelist);
      }
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        filelist.push(dirFile);
      }
    }
  }
  return filelist;
}

const targetDirs = [path.join(__dirname, 'components'), path.join(__dirname, 'app'), path.join(__dirname, 'lib')];
const files = targetDirs.flatMap(dir => walkSync(dir));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Replace hardcoded localhost:8000 fallbacks with relative paths so Next.js internal rewrites proxy them
  content = content.replace(/process\.env\.NEXT_PUBLIC_API_URL \|\| ['"]http:\/\/localhost:8000['"]/g, "process.env.NEXT_PUBLIC_API_URL || ''");
  content = content.replace(/process\.env\.NEXT_PUBLIC_API_URL \? `\${process\.env\.NEXT_PUBLIC_API_URL}\/api` : ['"]http:\/\/localhost:8000\/api['"]/g, 'process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api` : "/api"');
  content = content.replace(/process\.env\.NEXT_PUBLIC_API_URL \? `\${process\.env\.NEXT_PUBLIC_API_URL}\/api\/chat` : ['"]http:\/\/localhost:8000\/api\/chat['"]/g, 'process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/chat` : "/api/chat"');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
