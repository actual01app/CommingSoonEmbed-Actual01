import "./App.css";
import React from "react";
import axios from "axios";
import { PopupButton } from "react-calendly";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

async function subscribeOnClick() {
  if (document.getElementById("email-input").value === "") {
    document.getElementById("SubscribeMessage").style.color = "rgb(255, 89, 0)";
    document.getElementById("SubscribeMessage").innerText =
      "Please Enter Your Email";
    document.getElementById("SubscribeMessage").style.display = "block";
    document.getElementById("SubscribeMessage").style.opacity = 1;
    return 1;
  }

  if (validateEmail(document.getElementById("email-input").value) === null) {
    document.getElementById("SubscribeMessage").style.color = "rgb(255, 89, 0)";
    document.getElementById("SubscribeMessage").innerText =
      "Please Enter a Valid Email";
    document.getElementById("SubscribeMessage").style.display = "block";
    document.getElementById("SubscribeMessage").style.opacity = 1;
    return 1;
  }

  document.getElementById("SubscribeMessage").style.color = "white";
  document.getElementById("SubscribeMessage").innerText =
    "Please Wait: Loading Your Gift";
  document.getElementById("SubscribeMessage").style.display = "block";
  document.getElementById("SubscribeMessage").style.opacity = 1;

  try {
    let res = await axios.post(
      "https://actual01-server.onrender.com/api/emails",
      {
        email: document.getElementById("email-input").value,
      }
    );
  } catch (err) {
    console.log(err);
    if (err.response.status === 400)
      document.getElementById("SubscribeMessage").style.color =
        "rgb(255, 89, 0)";
    document.getElementById("SubscribeMessage").innerText =
      "This Email Has Already Registered";
    return 400;
  }

  document.getElementById("SubscribeMessage").style.color = "white";
  document.getElementById("SubscribeMessage").innerText =
    "We got a special surprise waiting for you in your inbox.";

  return 0;
}

setTimeout(() => {
  document
    .getElementById("email-input")
    .addEventListener("keydown", (event) => {
      let name = event.key;
      if (name === "Enter") subscribeOnClick();
    });
}, 1);

function App() {
  return (
    <div className="App">
      <div className="AppContainer">
        <div id="MainBox">
          <div className="MainBoxItem" id="Actual01HeadingAndWaitList">
            <h1 id="Actual01Heading">
              <span class="animateText">@Actual </span>01 .xyz
              <hr />
              Coming
              <span class="animateText"> Soon </span>
            </h1>
            <div className="MainBoxItem" id="AboutActual01 ">
              <div>
                Actual01 is an ideology of putting your ideas into execution and
                fostering the new generation of creators.
                <br />
                (Who is a creator? The one who create things that never exsited)
              </div>
            </div>
            <div id="EmailWaitList">
              <div id="SubscribeDescription">
                Join Wait List to claim cool surprises:
              </div>
              <div id="EmailWaitListForm">
                <input type="email" placeholder="Email" id="email-input" />
                <button onClick={subscribeOnClick}>Join Wait&nbsp;List</button>
              </div>
              <div id="SubscribeMessage">
                We got a special surprise waiting for you in your inbox.
                {/* <hr /> */}
              </div>

              {/* <hr /> */}
              <div id="Contact">
                <p>If you want to talk to us, let's get on the call with us</p>
                <span>
                  <PopupButton
                    className="FloatingCalButton"
                    url="https://calendly.com/actual01-xyz"
                    rootElement={document.getElementById("root")}
                    text="Let's Connect!"
                    pageSettings={{
                      backgroundColor: "101010",
                      hideEventTypeDetails: false,
                      hideLandingPageDetails: false,
                      primaryColor: "00a2ff",
                      textColor: "ffffff",
                    }}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
