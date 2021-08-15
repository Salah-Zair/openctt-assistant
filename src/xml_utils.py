from typing import List
import uuid
import xml.etree.ElementTree as ET

from src.settings import (TeacherKey, ClassRoomKey,
                          CoursesKey, LessonTtKey,
                          DaysKey, TermsKey,
                          EduProgramGroupsKey,
                          EduProgramsKey)


def get_root_element_file(file_path: str) -> ET:
    tree = ET.parse(file_path)
    return tree.getroot()


def get_node_if_exist(node: ET, key):
    if node.find(key):
        return node.find(key).text.lstrip()
    return None


def get_propriety_if_exist(node: ET, key):
    if node.get(key):
        return node.get(key).lstrip()
    return None


def get_teachers(root_element: ET) -> List[dict]:
    teachers = []
    for node in root_element.findall("teachers/teacher"):
        teacher = {
            TeacherKey.ID: int(node.get('id').lstrip()),
            TeacherKey.NAME: node.find('name').text.lstrip(),
            TeacherKey.LAST_NAME: node.find('last_name').text.lstrip(),
            TeacherKey.TITLE: node.find('title').text.lstrip(),
            TeacherKey.EDU_RANK: node.find('edu_rank').text.lstrip(),
            TeacherKey.EXT_ID: get_node_if_exist(node, 'extid'),
        }

        if n := node.find('spec_slots'):
            teacher[TeacherKey.SPEC_SLOTS] = {
                TeacherKey.TYPE: node.find('spec_slots').get('type').lstrip(),
                TeacherKey.SPEC_SLOTS: [
                    {
                        TeacherKey.DAY_INDEX: int(item.find("day_index").text.strip()),
                        TeacherKey.TERM_INDEX: int(item.find("term_index").text.strip())
                    }
                    for item in node.findall("spec_slots/spec_slot")
                ]
            }

        teachers.append(teacher)

    return teachers


def get_days(root_element: ET) -> List[dict]:
    days = []
    for node in root_element.findall("incl_days/day_index"):
        day = {
            DaysKey.ID: int(node.text.lstrip()),
        }
        days.append(day)
    return days


def get_terms(root_element: ET) -> List[dict]:
    terms = []
    for node in root_element.findall("incl_terms/term"):
        term = {
            TermsKey.INDEX: int(node.get("index")),
            TermsKey.TERM: node.text.lstrip(),
        }
        terms.append(term)
    return terms


def get_class_rooms(root_element: ET) -> List[dict]:
    class_roomes = []
    for node in root_element.findall("classrooms/classroom"):
        class_room = {
            ClassRoomKey.ID: int(node.get("id")),
            ClassRoomKey.NAME: node.find('name').text.lstrip(),
            ClassRoomKey.EXT_ID: node.find('extid').text.lstrip(),
            ClassRoomKey.CAPACITY: int(node.find('capacity').text.lstrip())
        }

        if node.find('spec_slots'):
            class_room[ClassRoomKey.SPEC_SLOTS] = {
                ClassRoomKey.TYPE: node.find('spec_slots').get('type'),
                ClassRoomKey.SPEC_SLOTS: [
                    {
                        ClassRoomKey.DAY_INDEX: int(item.find("day_index").text.strip()),
                        ClassRoomKey.TERM_INDEX: int(item.find("term_index").text.strip())
                    }
                    for item in node.findall("spec_slots/spec_slot")
                ]
            }

        class_roomes.append(class_room)
    return class_roomes


def get_courses(element: ET) -> List[dict]:
    courses = []

    for node in element.findall("courses/course"):
        course = {
            CoursesKey.ID: int(node.get('id')),
            CoursesKey.NAME: node.find('name').text.lstrip(),
            CoursesKey.SHORT_NAME: node.find('short_name').text.lstrip(),
            CoursesKey.COURSE_TYPE: node.find('course_type').text.lstrip(),
            CoursesKey.NUM_LESSONS_WEEK: int(node.find('num_of_lessons_per_week').text.lstrip()),
            CoursesKey.NUM_ENROLLED_STUDENTS: int(node.find('num_of_enrolled_students').text.lstrip()),
            CoursesKey.GROUP_NAME: node.find('group_name').text.lstrip(),
            CoursesKey.TEACHER_ID: int(node.find('teacher_id').text.lstrip()),
            CoursesKey.EXT_ID: node.find('extid').text.lstrip(),
            CoursesKey.COURSE_TOGETHER: [int(course_id.text.lstrip()) for course_id in
                                         node.findall('to_hold_together_with/course_id')],
        }
        courses.append(course)

    return courses


def get_edu_programs(element: ET) -> List[dict]:
    edu_programs = []

    for node in element.findall("edu_programs/edu_program"):
        edu_program = {
            EduProgramsKey.ID: int(node.get('id')),
            EduProgramsKey.NAME: node.find('name').text.lstrip(),
            EduProgramsKey.CODE: node.find('code').text.lstrip(),
            EduProgramsKey.SEMESTER: node.find('semester').text.lstrip(),
            EduProgramsKey.EXT_id: node.find('extid').text.lstrip(),
            EduProgramsKey.COURSES: get_courses(node)
        }
        edu_programs.append(edu_program)

    return edu_programs


def get_edu_program_groups(root_element: ET) -> List[dict]:
    edu_program_groups = []

    counter_id = 1

    for node in root_element.findall("edu_program_groups/edu_program_group"):
        ext_id = get_node_if_exist(node, 'extid')
        edu_program_group = {
            EduProgramGroupsKey.NAME: node.find('name').text.lstrip(),
            EduProgramGroupsKey.EXT_ID: ext_id if ext_id else str(uuid.uuid1()),
            EduProgramGroupsKey.EDU_PROGRAMS: get_edu_programs(node),
        }
        edu_program_groups.append(edu_program_group)
    return edu_program_groups


def get_lessons_in_tt(root_element: ET) -> List[dict]:
    lessons = []

    for node in root_element.findall("activities/lessons_in_tt/lesson_in_tt"):
        lesson = {
            LessonTtKey.COURSE_ID: int(node.find('course_id').text.lstrip()),
            LessonTtKey.DAY_INDEX: int(node.find('day_index').text.lstrip()),
            LessonTtKey.TERM_INDEX: int(node.find('term_index').text.lstrip()),
            LessonTtKey.CLASS_ROOM_ID: int(node.find('classroom_id').text.lstrip()),
        }
        lessons.append(lesson)

    return lessons


def xml_file_to_json_data(file_path: str):
    root = get_root_element_file(file_path)

    data = {
        'document_type': get_propriety_if_exist(root, 'document_type'),
        'version': get_propriety_if_exist(root, 'version'),
        'edu_institution_name': root.find('edu_institution_name').text.lstrip(),
        'school_year': root.find('school_year').text.lstrip(),
        TeacherKey.TEACHERS: get_teachers(root),
        ClassRoomKey.CLASS_ROOMS: get_class_rooms(root),
        LessonTtKey.LESSON_IN_TT: get_lessons_in_tt(root),
        DaysKey.DAYS: get_days(root),
        TermsKey.TERMS: get_terms(root),
        EduProgramGroupsKey.EDU_PROGRAM_GROUPS: get_edu_program_groups(root)
    }

    return data


def xml_str_to_json_data(str_data: str):
    root = ET.fromstring(str_data)

    data = {
        'document_type': get_propriety_if_exist(root, 'document_type'),
        'version': get_propriety_if_exist(root, 'version'),
        'edu_institution_name': root.find('edu_institution_name').text.lstrip(),
        'school_year': root.find('school_year').text.lstrip(),
        TeacherKey.TEACHERS: get_teachers(root),
        ClassRoomKey.CLASS_ROOMS: get_class_rooms(root),
        LessonTtKey.LESSON_IN_TT: get_lessons_in_tt(root),
        DaysKey.DAYS: get_days(root),
        TermsKey.TERMS: get_terms(root),
        EduProgramGroupsKey.EDU_PROGRAM_GROUPS: get_edu_program_groups(root)
    }

    return data
