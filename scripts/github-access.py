"""Check GitHub access through Git Credential Manager without printing credentials."""
import json
import os
import subprocess
import urllib.request

def credential():
    env = dict(os.environ, GIT_TERMINAL_PROMPT='0', GCM_INTERACTIVE='never')
    try:
        result = subprocess.run(['git','credential','fill'], input='protocol=https\nhost=github.com\n\n', text=True, capture_output=True, env=env, timeout=20)
        values = dict(line.split('=',1) for line in result.stdout.splitlines() if '=' in line)
        return values.get('password') if result.returncode == 0 else None
    except subprocess.TimeoutExpired:
        return None

def request(token, path, data=None, method=None):
    headers = {'Authorization':'Bearer '+token,'Accept':'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','User-Agent':'student-learning-hub-setup'}
    payload = json.dumps(data).encode() if data is not None else None
    return json.load(urllib.request.urlopen(urllib.request.Request('https://api.github.com'+path,data=payload,headers=headers,method=method),timeout=25))

if __name__=='__main__':
    token = credential()
    if token:
        try:
            user = request(token,'/user')
            print(json.dumps({'authenticated':True,'login':user['login']}))
        except Exception as error:
            print(json.dumps({'authenticated':False,'reason':type(error).__name__}))
    else:
        print(json.dumps({'authenticated':False,'reason':'No noninteractive GitHub credential available'}))
