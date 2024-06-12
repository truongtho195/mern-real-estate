import multer from 'multer';
import path from 'path';

const storage =  multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/'); // Đường dẫn lưu trữ file upload
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}_${path.basename(file.originalname)}`);
    }
})

const fileFilter = (req,file,cb)=>{
    const allowedTypes = /jpeg|jpg|png|gif/;

    console.log(`(fileFilter): ${file.originalname}`);
    const extName = allowedTypes.test(path.extname(file.originalname).toLocaleLowerCase());
    const mimetype= allowedTypes.test(file.mimetype);
    if(extName &&mimetype){
        return cb(null,true);

    }else{
        cb(new Error('Only images are allowed'));
    }
};

const upload = multer({
    storage:storage,
    fileFilter:fileFilter,
    limits:{fileSize:5 * 1024 * 1024}// limit 5mb
});

export default upload;



// class Upload{
//     constructor(){
//         const storage = multer.diskStorage({
//             destination:(req,file,cb)=>{
//                 cb(null,'./uploads')
//             },
//             filename:(req,file,cb)=>{
//                 cb(null,Date.now()+'-'+path.extname(file.originalname))
//             }
//         });
//         this.upload = multer({storage});
//     }
//     single(fieldName){
//         return this.upload.single(fieldName);
//     }
//     multiple(filename,maxCount){
//         return this.upload.array(filename,maxCount);
//     }
// }

// export default new Upload();