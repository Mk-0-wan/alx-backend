#!/usr/bin/env python3
"""Simple pagging function"""

from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """Function that returns the index range from the starting idx to
    the ending idx"""
    if ((page - 1) == 0):
        page_size *= page
        return ((page - 1), page_size)

    return (page_size * (page - 1), page_size * page)
