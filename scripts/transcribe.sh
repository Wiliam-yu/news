#!/bin/bash
# Voice transcription script

AUDIO_FILE="$1"
if [ -z "$AUDIO_FILE" ]; then
    echo "Usage: transcribe.sh <audio_file>"
    exit 1
fi

# Convert to mp3 first
OUTPUT=$(basename "$AUDIO_FILE").mp3
ffmpeg -i "$AUDIO_FILE" -q:a 2 -nostdin -y "$OUTPUT" 2>/dev/null

# Use Whisper API if key available
if [ -n "$OPENAI_API_KEY" ]; then
    curl -s -X POST "https://api.openai.com/v1/audio/transcriptions" \
        -H "Authorization: Bearer $OPENAI_API_KEY" \
        -H "Content-Type: multipart/form-data" \
        -F "file=@$OUTPUT" \
        -F "model=whisper-1" \
        -F "language=zh" \
        2>/dev/null | jq -r '.text // .error.message'
    rm -f "$OUTPUT"
    exit 0
fi

# Fallback: return a message
echo "需要配置 OPENAI_API_KEY 才能转录音频"
rm -f "$OUTPUT"
