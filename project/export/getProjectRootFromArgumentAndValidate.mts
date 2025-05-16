import {getProjectRootFromArgument} from "./getProjectRootFromArgument.mts"
import {validateProjectRoot} from "./validateProjectRoot.mts"

export async function getProjectRootFromArgumentAndValidate(
	root: Parameters<typeof getProjectRootFromArgument>[0]
): Promise<string> {
	const projectRoot = getProjectRootFromArgument(root)

	await validateProjectRoot(projectRoot)

	return projectRoot
}
