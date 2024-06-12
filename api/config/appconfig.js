
import path from 'path'
import { fileURLToPath } from 'url'
// Sử dụng `fileURLToPath` để có được đường dẫn hiện tại khi sử dụng ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 8800;
const hostname = process.env.HOST_NAME || "localhost";

const appConfig = {
    
    port : process.env.PORT || 8800,
    hostname : process.env.HOST_NAME || "localhost",
    domain:`http://${hostname}:${port}`
};

export default appConfig;