import { React, useContext,useRef, useEffect, useState } from "react";
import "./Chat.css";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import {format} from 'timeago.js'
import { SocketContext } from "../../context/SocketContext";
import {useNotificationStore} from  "../../lib/notificationStore.js"
import { checkAvatarUrl } from "../../utils/checkAvatarUrl.js";
function Chat({ chats }) {
    const [chat, setChat] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const { socket} = useContext(SocketContext);

    const messageEndRef = useRef()
    const decrease = useNotificationStore((state)=>state.decrease);
    const handleOpenChat = async (id, receiver) => {
        try {
            const res = await apiRequest("/chats/" + id);
            if(!res.data.seenBy.includes(currentUser.id)){
                decrease();
            }
            setChat({ ...res.data, receiver });
            console.log(`receiver :${receiver._id}`)
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const text = formData.get('text');
        if(!text) return ;
        try {
            const res = await apiRequest.post('/messages/'+chat._id,{text});
            setChat((prev)=>({...prev,messages:[...prev.messages,res.data]}));
            e.target.reset();
            console.log(`receiver :${chat.receiver._id}`)
            socket.emit("sendMessage",{
                receiverId:chat.receiver._id,
                data:res.data
            })
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        messageEndRef.current?.scrollIntoView({behavior:"smooth"});
    },[chat])

    useEffect(()=>{
        const read = async()=>{
            try {
                await apiRequest.put("/chats/read/"+chat._id);

            } catch (error) {
                console.error(error);
            }
        }


        if(chat && socket){
            socket.on("getMessage",(data)=>{ 
                console.log(`chat._id :${chat._id} || data.chatId :${data.chatId}`)
                if(chat._id ===data.chatId){
                    setChat((prev)=>({...prev,messages:[...prev.messages,data]}));
                    read();
                }
            })
        }
        return () => {
            socket.off("getMessage");
        };
    },[socket,chat])
    const testSocket=()=>{
        console.log('socket call')
        socket.emit("test","hi from client");
    }
    return (
        <div className="chat">
            <h1>Messages</h1>
            <button onClick={testSocket}>test socket {currentUser._id}</button>
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
                                checkAvatarUrl(c.receiver.avatar) ||
                                "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            }
                            alt=""
                        />
                        <span>{c.receiver.username}</span>
                        <p>{c.lastMessage}</p>
                        {/* <p>Receiver {c.receiver._id}</p>
                        <p>Me {c.receiver._id}</p> */}
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
                            
                            <div className={`chatMessage ${message.userId == currentUser._id ?'':'own'}` } key={message._id}>
                                
                                <p>{message.text}</p>
                                <span>{format(message.createdAt)}</span>
                            </div>
                        ))}
                        <div ref={messageEndRef}></div>
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
