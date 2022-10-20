import fs from "fs";
import path from "path";

export const readDBAsync = async () => {
    const file = await fs.promises.readFile(
        path.resolve(process.cwd(),"src/DB/db.json"),
        "utf-8"
    );

    console.log("file", file);
    
    return JSON.parse(file);
}
export const writeDBAsync = async (data = {}) => {
    await fs.promises.writeFile(
        path.resolve(process.cwd(),"src/DB/db.json"),
        JSON.stringify(data),
        "utf-8"
     );
}