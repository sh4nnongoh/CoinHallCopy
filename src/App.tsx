import React, {
  FC, ReactElement
} from "react";
import Home from "./views/Home";
const App: FC = (): ReactElement => (
  <div className="app">
    <Home />
  </div>
);
export default App;
