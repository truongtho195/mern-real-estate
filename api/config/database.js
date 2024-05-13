//Import the mongoose module
import mongoose from 'mongoose';

class Database { // Singleton
    connection = mongoose.connection;
    option={
            // useNewUrlParser: true,
            // useUnifiedTopology: true
    }
    constructor() {
        try {
            this.connection
            .on('open', console.info.bind(console, 'Database connection: open'))
            .on('close', console.info.bind(console, 'Database connection: close'))
            .on('disconnected', console.info.bind(console, 'Database connection: disconnecting'))
            .on('disconnected', console.info.bind(console, 'Database connection: disconnected'))
            .on('reconnected', console.info.bind(console, 'Database connection: reconnected'))
            .on('fullsetup', console.info.bind(console, 'Database connection: fullsetup'))
            .on('all', console.info.bind(console, 'Database connection: all'))
            .on('error', console.error.bind(console, 'MongoDB connection: error:'));
        } catch (error) {
            console.error(error);
        }
    }

    async connect(username, password, dbname) {
        try {
            await mongoose.connect(
            `mongodb+srv://${username}:${password}@cluster0.2a7nn.mongodb.net/${dbname}?retryWrites=true&w=majority`,
            this.option
            );
        } catch (error) {
            console.error(error);
        }
    }
    async connect(connectionString) {
        try {
            console.log(connectionString);
            await mongoose.connect(
                connectionString,
                this.option
            );
        } catch (error) {
            console.error(error);
        }
    }


    async close() {
        try {
            await this.connection.close();
        } catch (error) {
            console.error(error);
        }
    }
}

export default new Database();




// import mongoose from "mongoose";
// require('dotenv').config();


// const mongoDBState=[{
//     value:0,
//     label:'disconnected'
// },
// {
//     value:1,
//     label:'connected'
// },
// {
//     value:2,
//     label:'connecting'
// },
// {
//     value:3,
//     label:'disconnecting'
// },
// {
//     value:4,
//     label:'in valid credentials'
// }]


// const connection = async ()=>{
    
//     try {
//         const Port =process.env.DB_PORT;
//         const Username = process.env.DB_USER;
//         const Password = process.env.DB_PASSWORD;
//         const RemoteHost = `${process.env.DB_HOST}`;
//         const dbAddress = `mongodb://${process.env.DB_HOST}:${Port}`;
//         const options={
//             user:process.env.DB_USER,
//             pass:process.env.DB_PASSWORD,
//             dbName : process.env.DB_NAME,
//         }
//         await mongoose.connect(dbAddress,options);
//         console.log(`mongodb://${Username}:${Password}@${RemoteHost}:${Port}/restful_api`);
        

//         const state = Number(mongoose.connection.readyState);
//         console.log(mongoDBState.find(f=>f.value ==state).label,'To DB'); //logs 0


//     } catch (error) {
//         // handleError(error);
//         console.log(`error:${error}`);
//     }
// }

// module.exports = connection;