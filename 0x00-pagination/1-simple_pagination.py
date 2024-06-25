#!/usr/bin/env python3

"""Getting data from the pagination provided"""

import csv
import math
from typing import List


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

        print(type(self.__dataset))

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """Asserting values passed as pagers for the dataset"""
        if not isinstance(page, int) or not isinstance(page_size, int):
            raise AssertionError
        assert page == page > 0
        assert page_size == page_size > 0
        data = self.dataset()
        if ((page - 1) == 0):
            page_size *= page
            page -= 1
            return data[page: page_size]

        return data[(page_size * (page - 1)): (page_size * page)]
