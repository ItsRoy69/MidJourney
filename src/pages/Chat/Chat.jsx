import React, { useEffect, useState } from "react";
import "./Chat.css";
import { IoMdSend } from "react-icons/io";
import Axios from "axios";
import { io } from "socket.io-client";
import search_icon from "../../assets/icons/search.svg";
import send_icon from "../../assets/icons/send.svg";

let socket;

const Chat = () => {
  const user = JSON.parse(localStorage.getItem("user_info"));

  const [userSpaces, setUserSpaces] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState("");
  const ENDPOINT = `https://devcom-production.onrender.com`;

  const getUserSpaces = async () => {
    const res = await Axios.post(
      `https://devcom-production.onrender.com/get-users-spaces`,
      {
        username: user.username,
      }
    );
    localStorage.setItem("user_spaces", JSON.stringify(res.data));
    setUserSpaces(res.data);
    console.log(res.data);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setSearchRes([]);
    }
  };

  const submitSearch = async () => {
    const res = await Axios.post(
      `https://devcom-production.onrender.com/search-space`,
      {
        username: user.username,
        search: search,
      }
    );
    setSearchRes(res.data);

    console.log(res.data);
  };

  const sendMessage = async (e, space) => {
    e.preventDefault();
    console.log(space);
    const username = user.username;
    const id = space._id;
    const data = { username, id, message };
    console.log(data);
    if (message) {
      await Axios.post(
        "https://devcom-production.onrender.com/send-message",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
          alert("Message Not Sent!");
        });

      socket.emit("sendMessage", message, () => {});

      setMessage("");
    }
  };

  useEffect(() => {
    getUserSpaces();
    socket = io(ENDPOINT);
    console.log(socket);
    console.log(selectedSpace.spaceName);

    const username = user.username;

    socket.on("message", (message) => {
      console.log("message here!");
      setMessages((preValue) => {
        let arr = [...preValue, message].concat(selectedSpace.messages);
        let newUniqueArr = [...new Set(arr)];
        return newUniqueArr;
      });
    });

    if (selectedSpace) {
      socket.emit("join", { username, selectedSpace }, () => {});
    }

    // if(selectedSpace){
    // socket.emit("join", { username, selectedSpace }, () => {});
    // setMessages(selectedSpace.messages);
    // }

    return () => {
      socket.disconnect();
      socket.off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSpace]);

  console.log(userSpaces.members);
  console.log(selectedSpace);

  return (
    <div className="chat-main">
      <div className="articleshead">
        <h1>Let's chat, {user.fullname}!</h1>
      </div>

      <div className="chat-container">
        <div className="chat-box-1">
          <div className="search-box">
            <img src={search_icon} alt="Search" />
            <input
              type="text"
              id=""
              className="search"
              value={search}
              onChange={handleSearch}
            />
            {/* <input type="text" placeholder='Type something' className='inp' /> */}
            <div className="searchsbtn" onClick={submitSearch}>
              Search
            </div>
          </div>
          <div className="name-box">
            {searchRes.length === 0
              ? userSpaces.map((space) => {
                  return (
                    <div
                      className="names"
                      key={space.spaceName}
                      onClick={() => setSelectedSpace(space)}
                    >
                      <img src={space.chatPic} alt="..." />
                      <h3>
                        {space.members[0] === (user.name || user.admin)
                          ? space.members[1]
                          : space.members[0]}
                      </h3>
                    </div>
                  );
                })
              : searchRes.map((space) => {
                  return <div></div>;
                })}
          </div>
        </div>
        <div className="chat-box-2">
          {selectedSpace === "" ? (
            <div className="userclick">
              <h1>Select a user to chat!</h1>
            </div>
          ) : (
            <div className="userschat">
              <h1>
                Continue your chat with{" "}
                {selectedSpace.members[0] === user.username
                  ? selectedSpace.members[1]
                  : selectedSpace.members[0]}
              </h1>
              <div className="sender-message">
                <div className="message-container">
                  <div className="message_details">
                    {selectedSpace.messages ? (
                      <>
                        {messages
                          .filter((messages) => {
                            return (
                              messages.spacename === selectedSpace.spaceName
                            );
                          })
                          .map((messages) => {
                            return (
                              <>
                                <div
                                  className="message"
                                  id={
                                    user.username === messages.username
                                      ? "message-right"
                                      : "message-left"
                                  }
                                >
                                  <div>
                                    <div className="message-content">
                                      <p>{messages.message}</p>
                                    </div>
                                    <div className="message-meta">
                                      <p id="time">2:30</p>
                                      <p id="author">{messages.username}</p>
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          )}
          {selectedSpace === "" ? (
            <></>
          ) : (
            <div className="chat-section">
              <input
                type="text"
                placeholder="Hey..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button onClick={(e) => sendMessage(e, selectedSpace)}>
                <img src={send_icon} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
