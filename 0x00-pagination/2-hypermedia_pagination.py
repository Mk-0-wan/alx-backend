#!/usr/bin/env python3
"""Getting more detailed data from a dictionary"""

import csv
import math
from typing import List, Mapping, Union, Any, Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """Function that returns the index range from the starting idx to
    the ending idx"""
    if ((page - 1) == 0):
        page_size *= page
        return ((page - 1), page_size)

    return (page_size * (page - 1), page_size * page)


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_baby_names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        # print(type(self.__dataset))

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """Asserting values passed as pagers for the dataset"""
        if not isinstance(page, int) or not isinstance(page_size, int):
            raise AssertionError
        assert page == page > 0
        assert page_size == page_size > 0
        data = self.dataset()
        start_idx, end_idx = index_range(page, page_size)
        if start_idx > len(data):
            return []
        return data[start_idx: end_idx]


    def get_hyper(self, page: int = 1, page_size: int = 10) -> Mapping[str, Union[int, List[Any]]]:
        """getting a dictionary to provide more infomration"""
        dct = {}
        dct.update({"page_size": page_size})
        dct.update({"page": page})
        dct.update({"data": self.get_page(page, page_size)})
        total_pages = math.ceil(len(self.dataset()) / page_size)
        if (page - 1 == 0):
            dct.update({"prev_page": None})
        elif page + 1 > len(self.dataset()):
            dct.update({"next_page": None})
        dct.update({"prev_page": page - 1})
        dct.update({"next_page": page + 1})
        dct.update({"total_pages": total_pages })
        return dct
