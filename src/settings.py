MAX_SIZE = 1024  # MB

MAX_NESTED_NODE = 10

# KEYS

DOCUMENT_KEY = "document_key"


class TeacherKey:
    TEACHERS = 'teachers'
    #
    ID = 'id'
    NAME = 'name'
    LAST_NAME = 'last_name'
    TITLE = 'title'
    EDU_RANK = 'edu_rank'
    EXT_ID = 'extid'
    SPEC_SLOTS = 'spec_slots'
    TYPE = 'type'
    DAY_INDEX = 'day_index'
    TERM_INDEX = 'term_index'


class ClassRoomKey:
    CLASS_ROOMS = 'class_rooms'
    #
    ID = 'id'
    NAME = 'name'
    EXT_ID = 'extid'
    CAPACITY = 'capacity'
    SPEC_SLOTS = 'spec_slots'
    TYPE = 'type'
    DAY_INDEX = 'day_index'
    TERM_INDEX = 'term_index'


class CoursesKey:
    COURSES = 'courses'
    #
    ID = 'id'
    NAME = 'name'
    SHORT_NAME = 'short_name'
    COURSE_TYPE = 'course_type'
    NUM_LESSONS_WEEK = 'num_of_lessons_per_week'
    NUM_ENROLLED_STUDENTS = 'num_of_enrolled_students'
    GROUP_NAME = 'group_name'
    TEACHER_ID = 'teacher_id'
    EXT_ID = 'extid'
    COURSE_TOGETHER = 'to_hold_together_with'


class LessonTtKey:
    LESSON_IN_TT = 'lesson_in_tt'
    #
    COURSE_ID = 'course_id'
    DAY_INDEX = 'day_index'
    TERM_INDEX = 'term_index'
    CLASS_ROOM_ID = 'classroom_id'


class DaysKey:
    DAYS = 'days'
    #
    ID = 'id'


class TermsKey:
    TERMS = 'terms'
    #
    INDEX = "index"
    TERM = 'term'


class EduProgramsKey:
    EDU_PROGRAM = 'edu_programs'
    #
    ID = 'id'
    NAME = 'name'
    CODE = 'code'
    SEMESTER = 'semester'
    EXT_id = 'extid'
    COURSES = 'courses'


class EduProgramGroupsKey:
    EDU_PROGRAM_GROUPS = 'edu_program_groups'
    #
    NAME = 'name'
    EXT_ID = 'extid'
    EDU_PROGRAMS = 'edu_programs'
