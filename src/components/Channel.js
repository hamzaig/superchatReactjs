import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import MessageAll from "./MessageAll";
import "../App.css";


const Channel = ({ user = null, db = null }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setnewMessage] = useState("");
    const { uid, displayName, photoURL } = user;
    useEffect(() => {
        if (db) {
            const unsubscribe = db
                .collection("messages")
                .orderBy("createdAt")
                .limit(100)
                .onSnapshot(querySnapshot => {
                    const data = querySnapshot.docs.map(doc => ({
                        ...doc.data(),
                        id: doc.id,
                    }));
                    setMessages(data);
                });
            return unsubscribe;
        }
    }, [db]);

    const handleOnChange = (e) => {
        setnewMessage(e.target.value);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (db) {
            db.collection("messages").add({
                text: newMessage,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                displayName,
                photoURL,
            });
        }
        setnewMessage("");
    }

    return (
        <>
            <ul>
                {messages.map(message => (
                    <>
                        <li className="message-show" key={message.id}>
                            <MessageAll {...message} />
                        </li>
                    </>
                ))}
            </ul>
            <form className="container" onSubmit={handleOnSubmit}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={handleOnChange}
                    placeholder="Please enter your message"
                    className="form-control input-message"
                />
                <button className="btn btn-primary m-3 btn-send" type="submit">send</button>

            </form>
        </>
    );
}

export default Channel;
