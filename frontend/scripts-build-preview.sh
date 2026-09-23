#!/usr/bin/env bash
# Builds the hosted-preview version: #/ routes, relative paths, lighter media.
set -e
cd "$(dirname "$0")"
npx vite build --mode preview > /dev/null
cd dist-preview
rm -rf tactics/liverpool-madrid-five assets/automation/README.md
python3 - << 'PY'
from PIL import Image
import glob, os, re
for p in glob.glob('assets/content-engine/*.png'):
    im=Image.open(p).convert('RGB'); im.thumbnail((1600,1600)); im.save(p[:-4]+'.jpg', quality=82, optimize=True); os.remove(p)
for p in glob.glob('assets/players/*.jpg'):
    im=Image.open(p).convert('RGB'); im.thumbnail((360,360)); im.save(p, quality=84, optimize=True)
for p in glob.glob('assets/*.js')+glob.glob('assets/*.css'):
    s=open(p,encoding='utf-8').read()
    s=re.sub(r'(["\'`(])/(assets|tactics)/', r'\1\2/', s)
    s=re.sub(r'(assets/content-engine/[A-Za-z0-9_-]+)\.png', r'\1.jpg', s)
    s=s.replace('�','\\uFFFD')
    open(p,'w',encoding='utf-8').write(s)
s=open('index.html').read()
head=re.search(r'<head>(.*?)</head>',s,re.S).group(1); body=re.search(r'<body>(.*?)</body>',s,re.S).group(1)
head=re.sub(r'<title>.*?</title>','',re.sub(r'<meta[^>]*>','',head),flags=re.S)
open('/home/claude/artifact/portfolio-demo.html','w').write('<title>Ahmad Al-Smadi Portfolio</title>\n<style>html,body{background:#f3efe7;margin:0}</style>\n'+head.strip()+'\n'+body.strip()+'\n')
import json
files={os.path.relpath(os.path.join(r,f),'.'):os.path.abspath(os.path.join(r,f)) for r,_,fs in os.walk('.') for f in fs if f!='index.html'}
json.dump(files,open('/home/claude/artifact/files.json','w'))
print(len(files),'files', round(sum(os.path.getsize(v) for v in files.values())/1e6,1),'MB')
PY
