from src.settings import MAX_SIZE
import os


def is_valid_file(path: str) -> bool:
    size: int = os.path.getsize(path)

    return size / 2048 < MAX_SIZE



def get_sup_dict(original_dict: dict, keys: list) -> dict:
    sub_dict = {k: original_dict[k] for k in keys if k in original_dict}
    return sub_dict