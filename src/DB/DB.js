import fs from "fs";
import path from "path";

export const readDBAsync = async () => {
    const file = await fs.promises.readFile(
        path.resolve(process.cwd(),"src/DB/DB.json"),
        "utf-8"
    );

    return JSON.parse(file);
}