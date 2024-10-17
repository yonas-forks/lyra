// @ts-nocheck
import React from "react"
import { useLocation } from "@docusaurus/router"
import { useActiveVersion, useVersions } from "@docusaurus/plugin-content-docs/client"
import { useDocsPreferredVersion } from "@docusaurus/theme-common"
import { usePluginData } from "@docusaurus/useGlobalData"
import { OramaSearchBox, OramaSearchButton } from "@orama/react-components"
import { useOrama, PluginData } from "./useOrama"

export function OramaSearchNoDocs() {
	const { searchBoxConfig, searchBtnConfig, colorMode } = useOrama()

	return (
		<div>
			<OramaSearchButton {...searchBtnConfig} colorScheme={colorMode} className="DocSearch-Button" />
			{searchBoxConfig.basic && (
				<OramaSearchBox
					{...searchBoxConfig.basic}
					{...searchBoxConfig.custom}
					colorScheme={colorMode}
					searchParams={{
						where: {
							version: { eq: "current" }
						}
					}}
					facetProperty="category"
				/>
			)}
		</div>
	)
}

export function OramaSearchWithDocs({ pluginId }: { pluginId: string }) {
	const versions = useVersions(pluginId)
	const activeVersion = useActiveVersion(pluginId)
	const { preferredVersion } = useDocsPreferredVersion(pluginId)
	const currentVersion = activeVersion || preferredVersion || versions[0]
	const { searchBoxConfig, searchBtnConfig, colorMode } = useOrama()

	const searchParams = {
		...(currentVersion && {
			where: {
				version: { eq: currentVersion.name }
			}
		})
	}

	return (
		<div>
			<OramaSearchButton {...searchBtnConfig} colorScheme={colorMode} className="DocSearch-Button" />
			{searchBoxConfig.basic && (
				<OramaSearchBox
					{...searchBoxConfig.basic}
					{...searchBoxConfig.custom}
					colorScheme={colorMode}
					searchParams={searchParams}
					facetProperty="category"
				/>
			)}
		</div>
	)
}

export default function OramaSearchWrapper() {
	const { pathname } = useLocation()
	const { docsInstances }: PluginData = usePluginData("@orama/plugin-docusaurus") as PluginData
	const pluginId = docsInstances.filter((id: string) => pathname.includes(id))[0] || docsInstances[0]

	if (!pluginId) {
		return <OramaSearchNoDocs />
	}

	return <OramaSearchWithDocs pluginId={pluginId} />
}