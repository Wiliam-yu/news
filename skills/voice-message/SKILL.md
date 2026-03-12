# SKILL.md - Voice Message Handler

## What
Transcribes WhatsApp voice messages to text using OpenAI Whisper API.

## Why
Enable voice message support for the assistant.

## Setup
1. Set environment variable `OPENAI_API_KEY` with your OpenAI API key
2. Voice messages will be automatically transcribed

## Usage
When receiving a voice message (`.ogg` file):
1. Save the audio file
2. Transcribe using Whisper API
3. Process the transcription as text

## Technical Details
- Audio format: WhatsApp voice (Opus/OGG, 16kHz)
- API: OpenAI Whisper API
- Language: Chinese (zh)

## Notes
- Requires OPENAI_API_KEY environment variable
- Audio files stored in ~/.openclaw/media/inbound/
