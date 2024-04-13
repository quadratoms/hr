import React, { createContext } from "react";
import { Router, Route, Routes } from "react-router";

import logo from "./logo.svg";
import "./App.css";
import Main from "./components/Main";
import { BrowserRouter } from "react-router-dom";
import { useIsLoggedIn } from "./hooks/storage";
import Login from "./components/Login";
import NoContent from "./components/NoContent";
import User from "./components/User";
import CreateFormType from "./components/CreateFormType";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import FormTypeList from "./components/FormTypeList";
import { persistor, store } from "./store";
import CreateUserRequest from "./components/CreateUserRequest";
import UserRequestTable from "./components/UserRequestTable";
import { PersistGate } from "redux-persist/integration/react";

const ReachableContext = createContext<string | null>(null);
const UnreachableContext = createContext<string | null>(null);
// const store = createStore(rootreducer, applyMiddleware(thunk));
function App() {
  const { isLoggedIn, setIsLoggedIn } = useIsLoggedIn();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ReachableContext.Provider value="Light">
        <div className="h-screen">
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <Main>
                    <CreateUserRequest />
                  </Main>
                }
              ></Route>
              <Route
                path="/formtype"
                element={
                  <Main>
                    <FormTypeList />
                  </Main>
                }
              ></Route>
              <Route
                path="/formtype/new"
                element={
                  <Main>
                    <CreateFormType />
                  </Main>
                }
              ></Route>
              <Route
                path="/formtype/edit"
                element={
                  <Main>
                    <CreateFormType />
                  </Main>
                }
              ></Route>
              <Route
                path="/request"
                element={
                  <Main>
                    <UserRequestTable />
                  </Main>
                }
              ></Route>
              <Route
                path="/my-request"
                element={
                  <Main>
                    <UserRequestTable />
                  </Main>
                }
              ></Route>
              <Route
                path="/request/new"
                element={
                  <Main>
                    <CreateUserRequest />
                  </Main>
                }
              ></Route>
              <Route
                path="/request/edit"
                element={
                  <Main>
                    <CreateUserRequest />
                  </Main>
                }
              ></Route>
              <Route
                path="*"
                element={
                  <Main>
                    <NoContent />
                  </Main>
                }
              ></Route>
              <Route path="/login" element={<Login />}></Route>
            </Routes>
          </BrowserRouter>
        </div>
        {/* `contextHolder` should always be placed under the context you want to access */}

        {/* Can not access this context since `contextHolder` is not in it */}
        <UnreachableContext.Provider value="Bamboo" />
      </ReachableContext.Provider>
      </PersistGate>
    </Provider>
  );
}

export default App;
