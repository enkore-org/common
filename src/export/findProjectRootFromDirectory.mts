import {findNearestFile} from "@aniojs/node-fs"
import path from "node:path"

export async function findProjectRootFromDirectory(
	startDirectory: string
): Promise<string|false> {
	const result = await findNearestFile("enkore.config.mts", startDirectory)

	if (result === false) return false

	const projectRoot = path.dirname(result)

	return projectRoot
}
