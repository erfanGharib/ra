import { uploadsDirPath } from "../global/index.js"
import fs from "fs";

export const checkUploadsDirExistence = () => {
	if(!fs.existsSync(uploadsDirPath))
		fs.mkdirSync(uploadsDirPath, { recursive: true })
}