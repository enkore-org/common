import {createRequire} from "node:module"
import path from "node:path"

export async function resolveImportSpecifierFromProjectRoot(
	projectRoot: string,
	specifier: string
) : Promise<string|false> {
	// todo: use import.meta.resolve when second parameter
	// is not experimental anymore
	const require = createRequire(
		path.join(projectRoot, "index.js")
	)

	let result : string|boolean = false

	try {
		result = require.resolve(specifier)
	} catch {}

	return result
}
