import asyncio

from fastapi import FastAPI
from pydantic import BaseModel
import uuid

from fastapi import FastAPI, File, UploadFile,HTTPException
from tinydb.database import TinyDB
from tinydb import Query

from fastapi.middleware.cors import CORSMiddleware


from src.settings import DOCUMENT_KEY, TeacherKey, GroupKEY, YearKey
from src.xml_utils import xml_str_to_json_data
from src.json_utils import get_group_data, get_course_data, get_class_room_data, get_teacher_data,get_free_rooms,get_available_teachers,get_courses

db = TinyDB('temp.json')

table = db.table('documents')

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "http://127.0.0.1:5500",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
        new_data = get_group_data(data[0], key1, id)

        return new_data

    return {}


@app.get("/document/all")
async def get_group_table():
    documents = table.all()

    # for testing
    await  asyncio.sleep(2)

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
async def get_document(key: str):
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


# TODO : edit the way group are selected
@app.get("/document/{key}/{year_id}/{group_id}")
async def get_group(key: str, year_id: int, group_id: int):
    print("here")
    document = Query()
    data = table.search(document.document_key == key)

    if data:
        years = data[0][YearKey.YEAR_KEY]
        if 0 <= year_id < len(years):
            groups = years[year_id][YearKey.GROUPS]
            if 0 <= group_id < len(groups):
                return groups[group_id]

    return {'message': 'not found'}


@app.get("/group/{document_key}/{group_id}/")
async def get_group_table(document_key: str, group_id: int):
    document = Query()
    result = table.search(document.document_key == document_key)

    if result:
        data = result[0]
        schedule = get_group_data(data, group_id)
        if schedule:
            return schedule

    return {'message': 'not found'}


@app.get("/courses/{document_key}/{course_id}")
async def get_course(document_key: str, course_id: int):
    await asyncio.sleep(3)
    document = Query()
    result = table.search(document.document_key == document_key)

    if result:
        data = result[0]
        course_data = get_course_data(data, course_id)
        return course_data

    raise HTTPException(status_code=404, detail="Item not found")


@app.get("/class_room/{document_key}/{class_room_id}")
async def get_class_room(document_key: str, class_room_id: int):
    document = Query()
    result = table.search(document.document_key == document_key)

    if result:
        data = result[0]
        class_room = get_class_room_data(data, class_room_id)
        return class_room

    return {'message': 'not found'}


@app.get("/teachers/{document_key}/{teacher_id}")
async def get_class_room(document_key: str, teacher_id: int):
    document = Query()
    result = table.search(document.document_key == document_key)

    if result:
        data = result[0]
        teacher_data = get_teacher_data(data, teacher_id)
        return teacher_data

    return {'message': 'not found'}



@app.get("/free_class_rooms/{document_key}/")
async def get_class_room(document_key: str):
    await asyncio.sleep(2)
    document = Query()
    result = table.search(document.document_key == document_key)

    if result:
        data = result[0]
        free_class_rooms = get_free_rooms(data)
        return free_class_rooms

    raise HTTPException(status_code=404, detail="Item not found")


@app.get("/available_teachers/{document_key}/")
async def free_teachers(document_key: str):
    document = Query()
    result = table.search(document.document_key == document_key)

    if result:
        data = result[0]
        free_class_rooms = get_available_teachers(data)
        return free_class_rooms

    return {'message': 'not found'}


#  Tables



@app.get("/courses/{document_key}/")
async def free_teachers(document_key: str):
    document = Query()
    result = table.search(document.document_key == document_key)

    if result:
        data = result[0]
        free_class_rooms = get_courses(data)
        return free_class_rooms

    return {'message': 'not found'}




@app.get("/")
async def main():
    return {"message": "Hello World"}