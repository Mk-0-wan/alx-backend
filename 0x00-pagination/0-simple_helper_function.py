#!/usr/bin/env
"""Simple pagging function"""

from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """Function that returns the index range from the starting idx to
    the ending idx"""
    y = 0
    x = 0
    if ((page - 1) == 0):
        y = page_size
        y *= page
    else:
        y = page_size
        x = (page_size * (page - 1))
        y += (page_size * (page - 1))
    return (x, y)
