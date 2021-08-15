from fastapi import FastAPI
from pydantic import BaseModel
import uuid

from fastapi import FastAPI, File, UploadFile
from tinydb.database import TinyDB
from tinydb import Query

from src.settings import DOCUMENT_KEY, TeacherKey, GroupKEY, YearKey
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


@app.get("/document/{key}/")
async def get_document(key):
    document = Query()
    data = table.search(document.document_key == key)

    if data:
        return data[0]

    return {'message': 'document not found'}


@app.get("/document/{key}/{year_id}")
async def get_year(key: str, year_id: int):
    document = Query()
    data = table.search(document.document_key == key)

    if data:
        years: list = data[0][YearKey.YEAR_KEY]
        if 0 <= year_id < len(years):
            return years[year_id]

    return {'message': 'not found'}


@app.get("/document/{key}/{year_id}/{group_id}")
async def get_group(key: str, year_id: int, group_id: int):
    document = Query()
    data = table.search(document.document_key == key)

    if data:
        years = data[0][YearKey.YEAR_KEY]
        if 0 <= year_id < len(years):
            groups = years[year_id][GroupKEY.GROUP_KEY]
            if 0 <= group_id < len(groups):
                return groups[group_id]

    return {'message': 'not found'}

#
# @app.get("/document/{key}/{edu_program_group_id}/{group_id}/schedule")
# async def get_group_table(key: str, edu_program_group_id: int, group_id: int):
#     document = Query()
#     data = table.search(document.document_key == key)
#
#     if data:
#         edu_program_group = data[0][EduProgramGroupsKey.EDU_PROGRAM_GROUPS]
#         if 0 <= edu_program_group_id < len(edu_program_group):
#             group = edu_program_group[edu_program_group_id]
#             if 0 <= group_id < len(group[EduProgramGroupsKey.EDU_PROGRAMS]):
#                 return get_timetable_group(data[0], group[EduProgramGroupsKey.EXT_ID], group_id)
#
#     return {'message': 'not found'}
