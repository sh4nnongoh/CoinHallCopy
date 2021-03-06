import axios from "axios";
import React, {
  FC, ReactElement, useContext, useEffect
} from "react";
import { CoinHallMethodContext } from "../contexts/CoinHallProvider";
import Loader from "./Loader";
const GetCoinHallData: FC<{
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}> = ({
  isLoading,
  setIsLoading
}): ReactElement => {
  const {
    getTokenPairInfo,
    filterAndSortPoolCards,
    localStoreHasData
  } = useContext(CoinHallMethodContext);
  useEffect(() => {
    const source = axios.CancelToken.source();
    if (!localStoreHasData()) {
      setIsLoading(true);
      getTokenPairInfo({ cancelToken: source.token })
        .then(() => {
          filterAndSortPoolCards();
          return setIsLoading(false);
        })
        .catch((e) => {
          if (!axios.isCancel(e)) {
            console.log("Something went wrong:", e);
          }
        });
    } else {
      setIsLoading(false);
      filterAndSortPoolCards();
    }
    return () => {
      source.cancel();
    };
  }, [
    localStoreHasData,
    getTokenPairInfo,
    filterAndSortPoolCards,
    setIsLoading
  ]);
  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && <div className="invisible w-0 h-0">Loaded</div>}
    </>
  );
};
export default GetCoinHallData;
