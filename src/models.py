from datetime import datetime


class Teacher:
    def __init__(self):
        self.teacher_id: int
        self.name: str
        self.last_name: str
        self.title: str
        self.edu_rank: str
        self.ext_id: int


class Room:
    def __init__(self):
        self.room_id: int
        self.name: str
        self.capacity: int
        self.ext_id: int


class Day:
    def __init__(self):
        self.day_id: int
        self.name: int
        self.day_index: int


class Term:
    def __init__(self):
        self.term_id: int
        self.start_h: int
        self.start_min: int
        self.end_h: int
        self.end_min: int
        self.term_index


class EducationProgrammeGroup:
    def __init__(self):
        self.epg_id: int
        self.name: int
        self.ext_id: int


class EducationProgramme:
    def __init__(self):
        self.ep_id: int
        self.name: str
        self.code: str
        self.semester: str
        self.ext_id: int
        self.epg_id: int


class TimeTableData:
    def __init__(self):
        self.tt_id: int
        self.type: int
        self.institution_name: str
        self.school_year: str
        self.last_change: str


class Course:
    def __init__(self):
        self.course_id: int
        self.name: str
        self.short_name: str
        self.group_name: str
        self.course_type: str
        self.num_of_lesson_per_week: int
        self.ext_id: int
        self.ep_id: int
        self.teacher_id: int


class AllocatedLesson:
    def __init__(self):
        self.allocless_id: int
        self.course_id: int
        self.room_id: int
        self.day_id: int
        self.term_id: int


class Session:
    def __init__(self):
        self.key: str
        self.expired_date: datetime
        self.user_id: int


class User:
    def __init__(self):
        self.user_id: int
        self.user_name: str
        self.email: str
        self.password: str
        self.is_logged_in: bool
        self.last_logged_in: datetime
