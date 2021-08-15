from src.xml_utils import xml_to_json_data
from pprint import pprint

from src.settings import EduProgramGroupsKey

edu_key = EduProgramGroupsKey.EDU_PROGRAM_GROUPS
pprint(xml_to_json_data("temp/em_18_19.oct")[edu_key])