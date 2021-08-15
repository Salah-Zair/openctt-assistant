from typing import List

from src.settings import (TeacherKey, ClassRoomKey,
                       CoursesKey, LessonTtKey,
                       DaysKey, TermsKey,
                       EduProgramGroupsKey,
                       EduProgramsKey)


# timetable groups
# timetable teachers
#  time table rooms
# freerooms_tp
# freerooms_salle
# freerooms_control
# available_teachers
# ble teacher vac

def get_edu_program_group_by_extid(data: dict, edu_program_group_extid: str):
    edu_program_groups_data = data[EduProgramGroupsKey.EDU_PROGRAM_GROUPS]
    for edu_program_group in edu_program_groups_data:
        if edu_program_group[EduProgramsKey.EXT_id] == edu_program_group_extid:
            return edu_program_group


def get_edu_program(edu_program_group: dict, group_id: int) -> dict:
    for edu_program in edu_program_group[EduProgramGroupsKey.EDU_PROGRAMS]:
        if edu_program[EduProgramsKey.ID] == group_id:
            return edu_program


def get_courses_id_from_edu_program(edu_program: dict):
    list_courses_id = []
    for course in edu_program[EduProgramsKey.COURSES]:
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


def get_timetable_group(data: dict, edu_program_group_extid: str, group_id: int):
    edu_groups_program = get_edu_program_group_by_extid(data, edu_program_group_extid)
    edu_program = get_edu_program(edu_groups_program, group_id)
    list_courses_id = get_courses_id_from_edu_program(edu_program)
    lessons_in_tt = get_lessons_in_tt_by_course_id(data, list_courses_id)

    teachers_id = get_teachers_id_from_courses(edu_program[EduProgramsKey.COURSES])
    teachers = get_teachers_by_id(data, teachers_id)

    class_rooms_ids = get_class_rooms_id_from_lessons(lessons_in_tt)
    class_rooms = get_class_room_by_id(data, class_rooms_ids)

    return {
        **edu_program,
        'teachers': teachers,
        'lessons': lessons_in_tt,
        'class_rooms': class_rooms
    }


