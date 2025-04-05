import {findProjectRootFromDirectory} from "./findProjectRootFromDirectory.mts"
import path from "node:path"

function inferProjectRoot(): string {
	const projectRoot = findProjectRootFromDirectory(
		path.dirname(process.argv[1])
	)

	if (!projectRoot) {
		throw new Error(
			`Unable to infer project root from process argv[1].\n` +
			`Please check that your project contains 'enkore.config.mts'.\n` +
			`Path used to infer project root: '${process.argv[1]}'.`
		)
	}

	return projectRoot
}

export function getProjectRootFromArgument(
	root: string | ["inferFromCLIArgs"]
): string {
	let projectRoot : string = root as string

	if (Array.isArray(root) && root[0] === "inferFromCLIArgs") {
		projectRoot = inferProjectRoot()
	}

	return projectRoot
}
