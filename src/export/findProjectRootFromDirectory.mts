import {findNearestFileSync} from "@aniojs/node-fs"
import path from "node:path"

export function findProjectRootFromDirectory(
	startDirectory: string
): string|false {
	const result = findNearestFileSync("enkore.config.mts", startDirectory)

	if (result === false) return false

	const projectRoot = path.dirname(result)

	return projectRoot
}
