from typing import Union
from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
import pypandoc
from tempfile import NamedTemporaryFile
import os

os.environ["PATH"] += os.pathsep + "/usr/bin/xelatex"

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    # allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.post("/convert")
async def convert_to_pdf(file: UploadFile = UploadFile(...)):
    if not file.filename.endswith(".docx"):
        raise HTTPException(status_code=400, detail="Only DOCX files are supported")

    try:
        with NamedTemporaryFile(suffix=".docx", delete=False) as temp_docx:
            temp_docx.write(file.file.read())
            temp_docx_path = temp_docx.name

        with NamedTemporaryFile(suffix=".pdf", delete=False) as temp_pdf:
            pypandoc.convert_file(temp_docx_path, 'pdf', format='docx', outputfile=temp_pdf.name)
            response = StreamingResponse(open(temp_pdf.name, "rb"), media_type="application/pdf")
            response.headers["Content-Disposition"] = f"attachment; filename={file.filename.replace('.docx', '.pdf')}"
            return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")
    finally:
        if 'temp_docx' in locals():
            temp_docx.close()
            os.unlink(temp_docx.name)
        if 'temp_pdf' in locals():
            temp_pdf.close()
            os.unlink(temp_pdf.name)