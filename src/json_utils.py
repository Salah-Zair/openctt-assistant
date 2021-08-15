from typing import List

from src.settings import (TeacherKey, ClassRoomKey,
                          CoursesKey, LessonTtKey,
                          DaysKey, TermsKey,
                          YearKey,
                          GroupKEY)


# timetable groups
# timetable teachers
#  time table rooms
# freerooms_tp
# freerooms_salle
# freerooms_control
# available_teachers
# ble teacher vac

def get_year_program_by_extid(data: dict, year_program_extid: str):
    years_program_data = data[YearKey.YEAR_KEY]
    for year_program in years_program_data:
        if year_program[GroupKEY.EXT_id] == year_program_extid:
            return year_program


def get_groups(year_program_data: dict, group_id: int) -> dict:
    for group in year_program_data[YearKey.GROUPS]:
        if group[GroupKEY.ID] == group_id:
            return group


def get_courses_id_from_group(group: dict):
    list_courses_id = []
    for course in group[GroupKEY.COURSES]:
        list_courses_id.append(course[CoursesKey.ID])

    return list_courses_id


def get_lessons_in_tt_by_course_id(data: dict, courses_id: list) -> list:
    lessons = []
    for lesson_in_tt in data[LessonTtKey.LESSON_IN_TT]:
        if lesson_in_tt[LessonTtKey.COURSE_ID] in courses_id:
            lessons.append(lesson_in_tt)

    return lessons


# TEACHERS FUNCTIONS
def get_teachers_id_from_courses(courses: List) -> List[int]:
    teachers_ids = []
    for course in courses:
        teachers_ids.append(course[CoursesKey.TEACHER_ID])

    return teachers_ids


def get_teachers_by_id(data: dict, teachers_id: List[int]) -> List[dict]:
    teachers = []
    for teacher in data[TeacherKey.TEACHERS]:
        if teacher[TeacherKey.ID] in teachers_id:
            teachers.append(teacher)

    return teachers


# CLASS_ROOMS FUNCTIONS
def get_class_rooms_id_from_lessons(lessons: List):
    class_rooms_ids = []
    for lesson in lessons:
        class_rooms_ids.append(lesson[LessonTtKey.CLASS_ROOM_ID])

    return class_rooms_ids


def get_class_room_by_id(data: dict, class_rooms_ids: List[int]) -> List[dict]:
    class_rooms = []
    for class_room in data[ClassRoomKey.CLASS_ROOMS]:
        if class_room[ClassRoomKey.ID] in class_rooms_ids:
            class_rooms.append(class_room)

    return class_rooms


def get_timetable_group(data: dict, year_program_extid: str, group_id: int):
    year_program = get_year_program_by_extid(data, year_program_extid)
    groups = get_groups(year_program, group_id)

    list_courses_id = get_courses_id_from_group(groups)
    lessons_in_tt = get_lessons_in_tt_by_course_id(data, list_courses_id)

    teachers_id = get_teachers_id_from_courses(groups[GroupKEY.COURSES])
    teachers = get_teachers_by_id(data, teachers_id)

    class_rooms_ids = get_class_rooms_id_from_lessons(lessons_in_tt)
    class_rooms = get_class_room_by_id(data, class_rooms_ids)

    return {
        **groups,
        'teachers': teachers,
        'lessons': lessons_in_tt,
        'class_rooms': class_rooms
    }
