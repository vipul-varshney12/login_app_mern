import React, { Component } from "react";

export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
    };
  }

  componentDidMount() {
    fetch("http://localhost:5049/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data,"userregistration");
        this.setState({ userData: data.data });
      });
  }

  render() {
    const { userData } = this.state;
    return (
      <div>
        {userData && (
          <div>
            <h1>Name: {userData.fname}</h1>
            <h1>Email: {userData.email}</h1>
          </div>
        )}
      </div>
    );
  }
}
