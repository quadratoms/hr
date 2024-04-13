import React from "react";
import PropTypes from "prop-types";

function NoContent() {
  return (
    <section className="page_404 bg-white py-6">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center ">404</h1>
              </div>

              <div className="contant_box_404">
                <h3 className="h2">Look like you're lost</h3>

                <p>the page you are looking for not available!</p>
                <p>check Application Form</p>

                <a href="/" className="link_404 text-green-600 font-bold">
                  Go to Application Form
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NoContent;


// export interface DebounceSelectProps<ValueType = any>
//   extends Omit<SelectProps<ValueType | ValueType[]>, "options" | "children"> {
//   fetchOptions: (search: string) => Promise<ValueType[]>;
//   debounceTimeout?: number;
// }

// // Usage of DebounceSelect
// interface UserValue {
//   label: string;
//   value: string;
// }

// async function fetchUserList(username: string): Promise<UserValue[]> {
//   console.log("fetching user", username);

//   return fetch("https://randomuser.me/api/?results=5")
//     .then((response) => response.json())
//     .then((body) =>
//       body.results.map(
//         (user: {
//           name: { first: string; last: string };
//           login: { username: string };
//         }) => ({
//           label: `${user.name.first} ${user.name.last}`,
//           value: user.login.username,
//         })
//       )
//     );
// }

// const App: React.FC = () => {

//   return (
//     <DebounceSelect
//       mode="multiple"
//       value={value}
//       placeholder="Select users"
//       fetchOptions={fetchUserList}
//       onChange={(newValue) => {
//         setValue(newValue as UserValue[]);
//       }}
//       style={{ width: "100%" }}
//     />
//   );
// };

// export default App;
