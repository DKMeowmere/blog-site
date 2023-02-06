import fs from "fs/promises"

export default async function isFileExisting(path: string) {
  try {
    await fs.stat(path)
    console.log("exists")
    return true
  }
  catch {
    console.log("not exists")
    return false
  }
}
