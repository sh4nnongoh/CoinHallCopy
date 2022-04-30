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
  const buttonDisableClassName = "flex items-center space-x-1 py-2 px-4 rounded"
  + " bg-gray-800 transition duration-100 text-gray-500 cursor-default";
  const buttonEnabledClassName = "py-2 px-4 bg-gray-800 rounded-r hover:text-violet-300"
  + " hover:bg-violet-800 hover:bg-opacity-30 transition duration-100";
  return (
    <div className="flex justify-end items-center mt-4 text-sm sm:text-base">
      <div className="flex items-center space-x-1 select-none">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => { setPage(page - 1); }}
          className={page === 1 ? buttonDisableClassName : buttonEnabledClassName}
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
          className={PoolCardList.length < page * 24 ? buttonDisableClassName : buttonEnabledClassName}
        >
          {"Next >"}
        </button>
      </div>
    </div>
  );
};
export default Pagination;
