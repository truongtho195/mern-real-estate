import {Server, } from "socket.io";
const io = new Server({
    cors:{
        origin:"http://localhost:5173"
    }
});

let onlineUser = [];
const addUser = (userId,socketId)=>{
    const userExists = onlineUser.find((user)=>user.userId === userId);

    console.log(`addUser=> userId :${userId} | socketId :${socketId}`)
    if(!userExists){
        onlineUser.push({userId,socketId});
    }

}


const removeUser = (socketId)=>{
    onlineUser = onlineUser.filter((user)=>user.socketId!==socketId);
}

const getUser = (userId)=>{
    return onlineUser.find((user)=>user.userId ==userId);
}
io.on("connection",(socket)=>{
    // socket.on("test",(data)=>{
    //     console.log(data)
    // })
    socket.on("newUser",(userId)=>{
        addUser(userId,socket.id)
        console.log( `UserId: ${userId} || SocketId :${socket.id}` )
    });
    socket.on("sendMessage",({receiverId,data})=>{
        const receiver = getUser(receiverId);
        console.log('receiver: ')
        console.log(onlineUser);
        io.to(receiver.socketId).emit("getMessage",data)
        console.log(receiverId);
    })

    socket.on('disconnect',()=>{
        removeUser(socket.id);
    })
    
});
io.listen("4000")