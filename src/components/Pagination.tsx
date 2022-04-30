import React, { FC, useContext } from "react";
import { CoinHallFilterSortContext } from "../contexts/CoinHallProvider";
const Pagination: FC<{
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>
}> = ({
  page,
  setPage
}) => {
  const { PoolCardList } = useContext(CoinHallFilterSortContext);
  return (
    <div className="flex justify-end items-center mt-4 text-sm sm:text-base">
      <div className="flex items-center space-x-1 select-none">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => { setPage(page - 1); }}
          className="flex items-center space-x-1 py-2 px-3 rounded bg-gray-800
          transition duration-100 text-gray-500 cursor-default"
        >
          {"< Previous"}
        </button>
        <div className="py-2 px-3 bg-gray-800 rounded">
          {page}
        </div>
        <button
          type="button"
          disabled={PoolCardList.length < page * 24}
          onClick={() => { setPage(page + 1); }}
          className="flex items-center space-x-1 py-2 px-3 rounded bg-gray-800
          transition duration-100 text-gray-500 cursor-default"
        >
          {"Next >"}
        </button>
      </div>
    </div>
  );
};
export default Pagination;
