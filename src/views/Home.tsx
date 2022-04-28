import React, {
  FC, ReactElement
} from "react";
import FilterButtons from "../components/FilterButtons";
import PoolCardList from "../components/PoolCardList";
const Home: FC = (): ReactElement => (
  <>
    <FilterButtons />
    <PoolCardList />
  </>
);
export default Home;
