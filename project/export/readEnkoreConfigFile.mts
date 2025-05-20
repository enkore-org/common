import {
	type EnkoreConfig,
	isEntityOfKind
} from "@anio-software/enkore-private.spec"
import path from "node:path"

export async function readEnkoreConfigFile(
	projectRoot: string
): Promise<EnkoreConfig> {
	//
	// Appending '#' as a temporary workaround for issue #17114
	//
	const tmp: Record<string, unknown> = await import(
		path.join(projectRoot, "enkore.config.mts#")
	)

	if ("default" in tmp) {
		console.warn(
			`using the default export to define the enkore config is deprecated.\n` +
			`please use the named export "config" instead.`
		)

		if (!isEntityOfKind(tmp.default, "EnkoreConfig")) {
			throw new Error(
				`Config object must be entity of kind 'EnkoreConfig'.`
			)
		}

		return tmp.default
	}

	if (!("config" in tmp)) {
		throw new Error(
			`enkore.config.mts must export symbol "config".`
		)
	}

	if (!isEntityOfKind(tmp.config, "EnkoreConfig")) {
		throw new Error(
			`Config object must be entity of kind 'EnkoreConfig'.`
		)
	}

	return tmp.config
}
