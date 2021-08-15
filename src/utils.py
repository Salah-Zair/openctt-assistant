from src.settings import MAX_SIZE
import os


def is_valid_file(path: str) -> bool:
    size: int = os.path.getsize(path)

    return size / 2048 < MAX_SIZE
