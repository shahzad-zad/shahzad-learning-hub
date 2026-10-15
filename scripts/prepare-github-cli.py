"""Download a portable official GitHub CLI and verify its release checksum."""
from pathlib import Path
import hashlib
import json
import urllib.request
import zipfile

root=Path(__file__).resolve().parent.parent
folder=root/'tmp/github-cli'
folder.mkdir(parents=True,exist_ok=True)
headers={'User-Agent':'shahzad-learning-hub-setup'}
def read(url):
    return urllib.request.urlopen(urllib.request.Request(url,headers=headers),timeout=60).read()
release=json.loads(read('https://api.github.com/repos/cli/cli/releases/latest'))
asset=next(a for a in release['assets'] if a['name'].endswith('_windows_amd64.zip'))
checksums=next(a for a in release['assets'] if a['name'].endswith('_checksums.txt'))
expected=next(line.split()[0] for line in read(checksums['browser_download_url']).decode().splitlines() if line.split()[-1]==asset['name'])
archive=folder/asset['name']
data=read(asset['browser_download_url'])
assert hashlib.sha256(data).hexdigest()==expected,'GitHub CLI checksum did not match'
archive.write_bytes(data)
with zipfile.ZipFile(archive) as z:
    for member in z.infolist():
        assert (folder/member.filename).resolve().is_relative_to(folder.resolve()),'Unsafe archive path'
    z.extractall(folder)
binary=next(folder.rglob('gh.exe'))
print(json.dumps({'version':release['tag_name'],'verified':True,'binary':str(binary)}))
