const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/theya/.gemini/antigravity/brain/6795ea24-ffb3-42d0-b6f1-81fbab80ed7a/.system_generated/logs/transcript.jsonl')
});

rl.on('line', (line) => {
  if (line.includes('"step_index":479') || line.includes('"step_index":481')) {
    try {
      const data = JSON.parse(line);
      console.log('STEP', data.step_index);
      if (data.tool_calls) {
        for (const tc of data.tool_calls) {
          console.log('Tool:', tc.name, tc.args.Path);
          if (tc.args.Replacement) {
            console.log('Replacement:', tc.args.Replacement);
          }
        }
      }
    } catch(e) {
      console.error(e);
    }
  }
});
