// @ts-nocheck

import {enkore} from "enkore"

const project = await enkore("/path/to/project", {
	stdIOLogs: true,
	isCIEnvironment: true
})

const {session, clean, productNames} = await project.init()

const {messages, autogenerate} = await clean()
const {messages, preprocess} = await autogenerate()
const {messages, lint} = await preprocess()
const {messages, compile} = await lint()
const {messages, buildProducts} = await compile()

const {messages} = await buildProducts(["name"])

// shorthand:
const {messages} = await project.build()
