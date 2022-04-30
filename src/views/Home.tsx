import React, {
  FC, ReactElement, useState
} from "react";
import FilterButtons from "../components/FilterButtons";
import Pagination from "../components/Pagination";
import PoolCardList from "../components/PoolCardList";
import SortButtons from "../components/SortButtons";
const Home: FC = (): ReactElement => {
  const [page, setPage] = useState(1);
  return (
    <>
      <FilterButtons />
      <SortButtons />
      <PoolCardList page={page} />
      <Pagination page={page} setPage={setPage} />
    </>
  );
};
export default Home;
