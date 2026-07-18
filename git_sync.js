const { execSync } = require('child_process');

const gitExe = `"C:/Users/user/AppData/Local/GitHubDesktop/app-3.6.3/resources/app/git/cmd/git.exe"`;

function runGit(cmd) {
  console.log(`\nRunning: git ${cmd}`);
  try {
    const output = execSync(`${gitExe} ${cmd}`, { cwd: __dirname, encoding: 'utf8', stdio: 'pipe' });
    console.log(output || '[Success]');
    return output;
  } catch (err) {
    console.log(`Output:`, err.stdout || err.stderr || err.message || err);
    return null;
  }
}

console.log('=== STARTING GIT REPO SYNC ===');
runGit('init');
runGit('branch -M main');
runGit('remote remove origin');
runGit('remote add origin https://github.com/kcs5540/an-hyeyoung.git');
runGit('remote -v');
runGit('add .');
runGit('commit -m "feat: complete premium antigravity personal branding landing page for Ahn Hye-young FP"');

console.log('\n=== FORCING PUSH TO MAIN BRANCH ===');
runGit('push -u origin main --force');
console.log('\n=== GIT SYNC COMPLETE ===');
