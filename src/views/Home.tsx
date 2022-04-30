import React, {
  FC, ReactElement
} from "react";
import FilterButtons from "../components/FilterButtons";
import Pagination from "../components/Pagination";
import PoolCardList from "../components/PoolCardList";
import SortButtons from "../components/SortButtons";
const Home: FC = (): ReactElement => (
  <>
    <FilterButtons />
    <SortButtons />
    <PoolCardList />
    <Pagination />
  </>
);
export default Home;
