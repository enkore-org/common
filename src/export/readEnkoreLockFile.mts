import path from "node:path"
import {
	readEntityJSONFile,
	type EnkoreLockFile
} from "@enkore/spec"

export async function readEnkoreLockFile(
	projectRoot: string
) : Promise<EnkoreLockFile> {
	return await readEntityJSONFile(
		path.join(projectRoot, "enkore-lock.json"), "EnkoreLockFile"
	)
}
