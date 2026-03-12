const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const audioFile = process.argv[2];
if (!audioFile) {
    console.error('Usage: node transcribe.js <audio_file.ogg>');
    process.exit(1);
}

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
    console.log('请设置 OPENAI_API_KEY 环境变量来启用语音转文字功能');
    console.log('你可以在 openclaw.json 中配置或直接提供 API Key');
    process.exit(1);
}

// Convert ogg to mp3 using Node (if needed) or just send directly
const audioPath = path.resolve(audioFile);

console.log('Transcribing:', audioPath);

// Use OpenAI Whisper API
const FormData = require('form-data');
const form = new FormData();
form.append('file', fs.createReadStream(audioPath));
form.append('model', 'whisper-1');
form.append('language', 'zh');

const https = require('https');
const url = require('url');

const options = {
    hostname: 'api.openai.com',
    path: '/v1/audio/transcriptions',
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        ...form.getHeaders()
    }
};

const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        try {
            const result = JSON.parse(data);
            console.log(result.text || result.error?.message || data);
        } catch(e) {
            console.log(data);
        }
    });
});

req.on('error', (e) => {
    console.error('Error:', e.message);
});

form.pipe(req);
