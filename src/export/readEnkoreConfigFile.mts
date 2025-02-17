import type {EnkoreConfig} from "@enkore/spec"
import path from "node:path"

export async function readEnkoreConfigFile(
	projectRoot: string
) : Promise<EnkoreConfig> {
	return (
		//
		// Appending '#' as a temporary workaround for issue #17114
		//
		await import(
			path.join(projectRoot, "enkore.config.mts#")
		)
	).default as EnkoreConfig
}
