import { graphql } from "graphql";
import fetch from "node-fetch";
import util from "util";

const getUserUpdates = async () => {
  let res = await fetch("http://192.168.20.4:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      {user {
        firstName
        lastName
        id
        address {
          num
          state
          street
          postCode
          city
          country
        }
        password
      }}
      `,
    }),
  });
  //let result = await res.json();
  console.log(res);
};

getUserUpdates();
