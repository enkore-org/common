import path from "node:path"
import {isFileSync} from "@aniojs/node-fs"
import {readEnkoreConfigFile} from "./readEnkoreConfigFile.mts"
import {resolveImportSpecifierFromProjectRoot} from "./resolveImportSpecifierFromProjectRoot.mts"

function checkIfEnkorePackageIsInstalled(
	projectRoot: string,
	packageName: string
): boolean {
	return resolveImportSpecifierFromProjectRoot(
		projectRoot,
		`${packageName}/package.json`
	) !== false
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
	if (checkIfEnkorePackageIsInstalled(projectRoot, `enkore`) === false) {
		throw new Error(
			`The 'enkore' package is not installed at the project root.\n` +
			`Please make sure you have it installed.`
		)
	}

	// check for enkore target package
	const targetPackageName = `@enkore-target/${projectConfig.target.name}`

	if (checkIfEnkorePackageIsInstalled(projectRoot, `${targetPackageName}`) === false) {
		throw new Error(
			`The '${targetPackageName}' package is not installed at the project root.\n` +
			`Please make sure you have it installed.`
		)
	}
}
