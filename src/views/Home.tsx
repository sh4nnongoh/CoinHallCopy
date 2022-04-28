import React, {
  FC, ReactElement
} from "react";
import FilterButtons from "../components/FilterButtons";
import PoolCardList from "../components/PoolCardList";
import SortButtons from "../components/SortButtons";
const Home: FC = (): ReactElement => (
  <>
    <FilterButtons />
    <SortButtons />
    <PoolCardList />
  </>
);
export default Home;
