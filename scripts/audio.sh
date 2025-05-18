#!/bin/bash

# Audio

echo "⚙️ Audio $1.mp3"
ffmpeg -i $1.wav -nostats -loglevel 0 -hide_banner -codec:a libmp3lame -b:a 128k $1.mp3
echo "✅ Audio"

# Notes

echo "⚙️ Info $1.txt"
ffprobe -i $1.mp3 -loglevel 0 -hide_banner -print_format json -show_chapters -pretty >> $1.json
node info.mjs $1
rm $1.json
echo "✅ Info"

# sh audio.sh 000
