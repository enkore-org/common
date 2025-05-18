import path from "node:path"
import {isFileSync} from "@aniojs/node-fs"
import {readEnkoreConfigFile} from "./readEnkoreConfigFile.mts"
import {resolveImportSpecifierFromProjectRoot} from "./resolveImportSpecifierFromProjectRoot.mts"

function checkIfEnkorePackageIsInstalled(
	projectRoot: string,
	names: string|string[]
): boolean {
	const packageNames = Array.isArray(names) ? names : [names]

	for (const packageName of packageNames) {
		const result = resolveImportSpecifierFromProjectRoot(
			projectRoot,
			`${packageName}/package.json`
		)

		if (result !== false) {
			return true
		}
	}

	return false
}

export async function validateProjectRoot(
	projectRoot: string
) {
	if (!isFileSync(path.join(projectRoot, "enkore.config.mts"))) {
		throw new Error(
			`Invalid project root '${projectRoot}'.\n` + 
			`No enkore.config.mts found at project root.`
		)
	}

	const projectConfig = await readEnkoreConfigFile(projectRoot)

	// check for "enkore" package
	if (checkIfEnkorePackageIsInstalled(projectRoot, ["@anio-software/enkore", "@asint/enkore", "enkore"]) === false) {
		throw new Error(
			`The 'enkore' package is not installed at the project root.\n` +
			`Please make sure you have it installed.`
		)
	}

	// check for enkore target package
	const targetPackageNames = [
		`@anio-software/enkore.target-${projectConfig.target.name}`,
		`@asint/enkore-target__${projectConfig.target.name}`,
		`@enkore-target/${projectConfig.target.name}`
	]

	if (checkIfEnkorePackageIsInstalled(projectRoot, targetPackageNames) === false) {
		throw new Error(
			`The '${targetPackageNames[1]}' package is not installed at the project root.\n` +
			`Please make sure you have it installed.`
		)
	}
}
