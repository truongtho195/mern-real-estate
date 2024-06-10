import { React, useContext, useState } from "react";
import "./Chat.css";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import {format} from 'timeago.js'
function Chat({ chats }) {
    const [chat, setChat] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const handleOpenChat = async (id, receiver) => {
        try {
            const res = await apiRequest("/chats/" + id);

            setChat({ ...res.data, receiver });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log('call')
        console.log(e.target)
        const formData = new FormData(e.target);
        const text = formData.get('text');
        if(!text) return ;
        try {
            const res = await apiRequest.post('/messages/'+chat._id,{text});
            setChat((prev)=>({...prev,messages:[...prev.messages,res.data]}))
            e.target.reset();
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="chat">
            <h1>Messages</h1>
            <div className="messages">
                {chats?.map((c) => (
                    <div
                        className={`message ${c.seenBy.includes(currentUser.Id) ? "bg-white" : "bg-[#fecd541e]"
                            } `}
                        key={c._id}
                        onClick={() => handleOpenChat(c._id, c.receiver)}
                    >
                        <img
                            src={
                                c.receiver.avatar ||
                                "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            }
                            alt=""
                        />
                        <span>{c.receiver.username}</span>
                        <p>{c.lastMessage}</p>
                        {/* <span className='deleteButton  '>X</span> */}
                    </div>
                ))}
            </div>
            {chat && (
                <div className="chatBox">
                    <div className="top">
                        <div className="user">
                            <img
                                src={
                                    chat.receiver.avatar ||
                                    "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                }
                                alt=""
                            />
                            {chat.receiver.username}
                        </div>
                        <span className="close" onClick={() => setChat(null)}>
                            {" "}
                            X
                        </span>
                    </div>
                    <div className="center">
                        
                        {chat.messages?.map((message) => (
                            
                            <div className={`chatMessage ${message.userId == currentUser._id ?'own':''}` } key={message._id}>
                                
                                <p>{message.text}</p>
                                <span>{format(message.createdAt)}</span>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit} className="bottom">
                        <textarea name="text"></textarea>
                        <button> Send</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Chat;
