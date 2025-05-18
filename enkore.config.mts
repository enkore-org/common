import {
	createConfig,
	createTargetJSNodeOptions
} from "@asint/enkore/spec/factory"

const isPublicRelease = (
	process.env?.RELEASE_VERSION ?? ""
).startsWith("vp")

export const config: unknown = createConfig({
	target: {
		name: "js-node",
		options: createTargetJSNodeOptions({
			registry: {
				"anioSoftware": {
					url: "https://npm-registry.anio.software",
					authTokenFilePath: "secrets/anio_npm_auth_token",
					clientPrivateKeyFilePath: "secrets/npm_client.pkey",
					clientCertificateFilePath: "secrets/npm_client.cert"
				}
			},

			packageSourceRegistryByScope: {
				"@asint": {
					registry: "anioSoftware"
				},
				"@anio-software": {
					registry: "anioSoftware"
				}
			},

			publish: [{
				packageName: "@asint/enkore__common",
				registry: "anioSoftware"
			}, {
				packageName: "@anio-software/enkore.common",
				registry: "anioSoftware"
			}]
		})
	}
})
