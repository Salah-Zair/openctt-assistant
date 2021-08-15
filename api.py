from fastapi import FastAPI
from pydantic import BaseModel
import uuid

from fastapi import FastAPI, File, UploadFile
from tinydb.database import TinyDB
from tinydb import Query

from src.settings import DOCUMENT_KEY, TeacherKey, EduProgramsKey, EduProgramGroupsKey
from src.xml_utils import xml_str_to_json_data
from src.json_utils import get_timetable_group

db = TinyDB('temp.json')

table = db.table('documents')

app = FastAPI()


@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
    try:
        data = await file.read()
        json_data = xml_str_to_json_data(data)
        document_key = str(uuid.uuid1())
        json_data[DOCUMENT_KEY] = document_key

        table.insert(json_data)

        return {
            "message": 'done',
            DOCUMENT_KEY: document_key
        }

    except Exception as e:
        print(e)
        return {
            'message': str(e)
        }


@app.get("/group/table/{data_key}/{key1}/{id}/")
async def get_group_table(data_key: str, key1: str, id: int):
    document = Query()
    data = table.search(document.document_key == data_key)
    if data:
        new_data = get_timetable_group(data[0], key1, id)

        return new_data

    return {}


@app.get("/test/")
async def get_group_table():
    document = Query()
    data = table.search(document.document_key == "bdccfd61-fdd4-11eb-ac43-b0104192812f")
    if data:
        return data[0]

    return {}


@app.get("/document/all")
async def get_group_table():
    documents = table.all()
    if documents:
        list_document = []
        for document in documents:
            list_document.append({
                DOCUMENT_KEY: document[DOCUMENT_KEY],
                "edu_institution_name": document["edu_institution_name"],
                "school_year": document["school_year"]
            })

        return list_document

    return {}


@app.get("/document/{key}/edu-programe-group")
async def get_group_table(key):
    document = Query()
    data = table.search(document.document_key == key)

    if data:
        return data[0][EduProgramGroupsKey.EDU_PROGRAM_GROUPS]

    return {}
