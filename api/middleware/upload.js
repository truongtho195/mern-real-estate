import multer from 'multer';
import path from 'path';
class Upload{
    constructor(){
        const storage = multer.diskStorage({
            destination:(req,file,cb)=>{
                cb(null,'./uploads')
            },
            filename:(req,file,cb)=>{
                cb(null,Date.now()+'-'+path.extname(file.originalname))
            }
        });
        this.upload = multer({storage});
    }
    single(fieldName){
        return this.upload.single(fieldName);
    }
    multiple(filename,maxCount){
        return this.upload.array(filename,maxCount);
    }
}

export default new Upload();