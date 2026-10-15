"""Package the reviewed project for upload, excluding local references and runtime state."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

root=Path(__file__).resolve().parent.parent
archive=root/'shahzad-learning-hub.zip'
include=['site','content','docs','scripts','.github']
with ZipFile(archive,'w',ZIP_DEFLATED) as z:
    for name in ['README.md','design.md','.gitignore']:
        z.write(root/name,name)
    for folder in include:
        for file in (root/folder).rglob('*'):
            if file.is_file() and '__pycache__' not in file.parts:
                z.write(file,file.relative_to(root))
print(archive)
