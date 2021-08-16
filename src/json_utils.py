from typing import List

from src.settings import (TeacherKey, ClassRoomKey,
                          CoursesKey, LessonTtKey,
                          DaysKey, TermsKey,
                          YearKey, GroupKEY
                          )

from src.utils import get_sup_dict


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


# Course
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


def get_year_spec_slot(year: dict):
    spec_slots = year.get("spec_slots")
    if spec_slots:
        return spec_slots
    return {}


# def get_group_data(data: dict, year_program_extid: str, group_id: int):
#     year_program = get_year_program_by_extid(data, year_program_extid)
#     groups = get_groups(year_program, group_id)

#     list_courses_id = get_courses_id_from_group(groups)
#     lessons_in_tt = get_lessons_in_tt_by_course_id(data, list_courses_id)

#     teachers_id = get_teachers_id_from_courses(groups[GroupKEY.COURSES])
#     teachers = get_teachers_by_id(data, teachers_id)

#     class_rooms_ids = get_class_rooms_id_from_lessons(lessons_in_tt)
#     class_rooms = get_class_room_by_id(data, class_rooms_ids)

#     return {
#         **groups,
#         'teachers': teachers,
#         'lessons': lessons_in_tt,
#         'class_rooms': class_rooms,
#         'spec_slot': get_year_spec_slot(year_program)
#     }


def get_course_data(data: dict, course_id: int):
    course = None
    year = None

    # get course data and year data
    print(len(data[YearKey.YEAR_KEY]))

    for year_item in data[YearKey.YEAR_KEY]:
        for group_item in year_item[YearKey.GROUPS]:
            for course_item in group_item[GroupKEY.COURSES]:
                if course_item[CoursesKey.ID] == course_id:
                    course = course_item
                    year = year_item
                    break

    if not course:
        return {}
    # get related courses and teachers id and groups data
    related_courses = []
    teachers_id = []
    groups = []
    groups_id = []
    # TODO: group is not nromalley worke
    # TODO: change set

    require_dict_key = ["id", "name", "code", "semester"]

    for group_item in year[YearKey.GROUPS]:
        for course_item in group_item[GroupKEY.COURSES]:
            if course_item[CoursesKey.ID] in course[CoursesKey.COURSE_TOGETHER]:
                course_item["related_group"] = group_item[GroupKEY.ID]
                related_courses.append(course_item)
                teachers_id.append(course_item[CoursesKey.TEACHER_ID])
                if group_item[GroupKEY.ID] not in groups_id:
                    groups_id.append(group_item[GroupKEY.ID])
                    groups.append(get_sup_dict(group_item, require_dict_key))

            elif course_item[CoursesKey.SHORT_NAME] == course[CoursesKey.SHORT_NAME]:
                course_item["related_group"] = group_item[GroupKEY.ID]
                related_courses.append(course_item)
                teachers_id.append(course_item[CoursesKey.TEACHER_ID])
                if group_item[GroupKEY.ID] not in groups_id:
                    groups_id.append(group_item[GroupKEY.ID])
                    groups.append(get_sup_dict(group_item, require_dict_key))

            elif course_item[CoursesKey.NAME] == course[CoursesKey.NAME]:
                course_item["related_group"] = group_item[GroupKEY.ID]
                related_courses.append(course_item)
                teachers_id.append(course_item[CoursesKey.TEACHER_ID])
                if group_item[GroupKEY.ID] not in groups_id:
                    groups_id.append(group_item[GroupKEY.ID])
                    groups.append(get_sup_dict(group_item, require_dict_key))

    # GET Teachers
    teachers = []

    for teacher in data[TeacherKey.TEACHERS]:
        if teacher[TeacherKey.ID] in teachers_id:
            teachers.append(teacher)

    # GET Lessons
    related_courses_id = [course_item[CoursesKey.ID]
                          for course_item in related_courses]
    lessons = []

    for lesson in data[LessonTtKey.LESSON_IN_TT]:
        if lesson[LessonTtKey.COURSE_ID] in related_courses_id:
            lessons.append(lesson)

    # GET Class rooms
    class_rooms = []

    for lesson in lessons:
        for class_room in data[ClassRoomKey.CLASS_ROOMS]:
            if class_room[ClassRoomKey.ID] == lesson[LessonTtKey.CLASS_ROOM_ID]:
                class_rooms.append(class_room)

    return {
        "course": course,
        "related_courses": related_courses,
        "teachers": teachers,
        "groups": groups,
        "lessons": lessons,
        "class_rooms": class_rooms,
        "days": data[DaysKey.DAYS],
        "terms": data[TermsKey.TERMS]
    }

    # time table teacher

    # time table roomes
    def get_roomes_data(data: dict):
        pass

    # available teachers
    def get_teachers_data(data: dict):
        pass


def get_class_room_data(data: dict, class_room_id: id):
    class_room: dict = None

    for class_room_item in data[ClassRoomKey.CLASS_ROOMS]:
        if class_room_item[ClassRoomKey.ID] == class_room_id:
            class_room = class_room_item
            break

    if not class_room:
        return {}

    lessons = []

    for lesson_item in data[LessonTtKey.LESSON_IN_TT]:
        if lesson_item[LessonTtKey.CLASS_ROOM_ID] == class_room[ClassRoomKey.ID]:
            lessons.append(lesson_item)

    lessons_id = [lesson_item[LessonTtKey.COURSE_ID]
                  for lesson_item in lessons]

    courses = []
    teachers_id = []
    groups = []
    groups_id = []

    require_dict_key = ["id", "name", "code", "semester"]

    years = []
    years_id = []
    require_year_key = ["name", "extid"]

    for year in data[YearKey.YEAR_KEY]:
        for group_item in year[YearKey.GROUPS]:
            for course_item in group_item[GroupKEY.COURSES]:
                if course_item[CoursesKey.ID] in lessons_id:
                    course_item["related_group"] = group_item[GroupKEY.ID]
                    courses.append(course_item)
                    teachers_id.append(course_item[CoursesKey.TEACHER_ID])
                    if group_item[GroupKEY.ID] not in groups_id:
                        groups_id.append(group_item[GroupKEY.ID])

                        course_group = get_sup_dict(
                            group_item, require_dict_key)
                        groups.append(course_group)

                    if year[YearKey.EXT_ID] not in years_id:
                        years_id.append(year[YearKey.EXT_ID])

                        course_year = get_sup_dict(
                            year, require_year_key)
                        years.append(course_year)
    # get teachers using teachers_id
    teachers = []
    for teacher in data[TeacherKey.TEACHERS]:
        if teacher[TeacherKey.ID] in teachers_id:
            teachers.append(teacher)

    return {
        'years': years,
        "class_room": class_room,
        "courses": courses,
        "teachers": teachers,
        "groups": groups,
        "lessons": lessons,
        "days": data[DaysKey.DAYS],
        "terms": data[TermsKey.TERMS]
    }


def get_teacher_data(data: dict, teacher_id: int):
    teacher: dict = None

    for teacher_item in data[TeacherKey.TEACHERS]:
        if teacher_item[TeacherKey.ID] == teacher_id:
            teacher = teacher_item
            break

    if not teacher:
        return {}

    courses = []
    teachers_id = []

    groups = []
    groups_id = []
    require_dict_key = ["id", "name", "code", "semester"]

    years = []
    years_id = []
    require_year_key = ["name", "extid"]

    for year in data[YearKey.YEAR_KEY]:
        for group_item in year[YearKey.GROUPS]:
            for course_item in group_item[GroupKEY.COURSES]:
                if course_item[CoursesKey.TEACHER_ID] == teacher[TeacherKey.ID]:
                    course_item["related_group"] = group_item[GroupKEY.ID]
                    courses.append(course_item)
                    if group_item[GroupKEY.ID] not in groups_id:
                        groups_id.append(group_item[GroupKEY.ID])

                        course_group = get_sup_dict(
                            group_item, require_dict_key)
                        groups.append(course_group)

                    if year[YearKey.EXT_ID] not in years_id:
                        years_id.append(year[YearKey.EXT_ID])

                        course_year = get_sup_dict(
                            year, require_year_key)
                        years.append(course_year)

    courses_id = [course_item[CoursesKey.ID] for course_item in courses]

    lessons = []
    class_rooms_id = []
    for lesson_item in data[LessonTtKey.LESSON_IN_TT]:
        if lesson_item[LessonTtKey.COURSE_ID] in courses_id:
            lessons.append(lesson_item)
            class_rooms_id.append(lesson_item[LessonTtKey.CLASS_ROOM_ID])

    class_rooms = []
    for class_room_item in data[ClassRoomKey.CLASS_ROOMS]:
        if class_room_item[ClassRoomKey.ID] in class_rooms_id:
            class_rooms.append(class_room_item)

    return {
        "years": year,
        "class_rooms": class_rooms,
        "courses": courses,
        "teacher": teacher,
        "groups": groups,
        "lessons": lessons,
        "days": data[DaysKey.DAYS],
        "terms": data[TermsKey.TERMS]
    }


def get_group_data(data: dict, group_id: int) -> dict:
    group: dict = None
    year: dict = None

    courses = []
    teachers_id = []
    for year_item in data[YearKey.YEAR_KEY]:
        
        for group_item in year_item[YearKey.GROUPS]:
            if group_item[GroupKEY.ID] == group_id:
                group = group_item
                year = year_item
                for course_item in group[GroupKEY.COURSES]:
                    course_item["related_group"] = group_item[GroupKEY.ID]
                    courses.append(course_item)
                    teachers_id.append(course_item[CoursesKey.TEACHER_ID])
                break

    if not group:
        return {}

    teachers = []

    for teacher_item in data[TeacherKey.TEACHERS]:
        if teacher_item[TeacherKey.ID] in teachers_id:
            teachers.append(teacher_item)

    courses_id = [course_item[CoursesKey.ID] for course_item in courses]
    lessons = []
    for lessson_item in data[LessonTtKey.LESSON_IN_TT]:
        if lessson_item[LessonTtKey.COURSE_ID] in courses_id:
            lessons.append(lessson_item)

    class_rooms_id = [lesson_item[LessonTtKey.CLASS_ROOM_ID]
                      for lesson_item in lessons]

    class_rooms = []
    for class_room_item in data[ClassRoomKey.CLASS_ROOMS]:
        if class_room_item[ClassRoomKey.ID] in class_rooms_id:
            class_rooms.append(class_room_item)

    require_dict_key = ["id", "name", "code", "semester"]
    group = get_sup_dict(group, require_dict_key)

    require_dict_key = ["name", "extid"]
    year = get_sup_dict(year, require_dict_key)

    return {
        "year": year,
        "class_rooms": class_rooms,
        "courses": courses,
        "teachers": teachers,
        "group": group,
        "lessons": lessons,
        "days": data[DaysKey.DAYS],
        "terms": data[TermsKey.TERMS]
    }
