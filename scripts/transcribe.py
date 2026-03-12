#!/usr/bin/env python3
# Voice transcription script using faster-whisper
import sys
import os

# Add to path
sys.path.insert(0, '/usr/local/lib/python3.12/dist-packages')

from faster_whisper import WhisperModel

def transcribe(audio_file, model_size='base'):
    if not os.path.exists(audio_file):
        print(f"File not found: {audio_file}")
        return None
    
    print(f"Loading model: {model_size}...")
    model = WhisperModel(model_size, device='cpu', compute_type='int8')
    
    print(f"Transcribing: {audio_file}")
    segments, info = model.transcribe(audio_file, language='zh')
    
    print(f"Detected language: {info.language} (probability: {info.language_probability:.2f})")
    
    text = ' '.join([segment.text for segment in segments])
    return text

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: transcribe.py <audio_file>")
        sys.exit(1)
    
    audio = sys.argv[1]
    result = transcribe(audio)
    if result:
        print("\n=== Transcription ===")
        print(result)
