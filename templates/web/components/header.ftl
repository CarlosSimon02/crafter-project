<#import "/templates/system/common/crafter.ftl" as crafter />
<#-- Detect current locale from the first path segment of the request URI.
     /en/about -> "en", /zh/ -> "zh", / -> falls through to default. -->
<#assign currentLocale = "en" />
<#list (request.requestURI?split("/"))![] as part>
  <#if part?has_content>
    <#assign currentLocale = part />
    <#break>
  </#if>
</#list>

<div
  data-header
  data-current-locale="${currentLocale}"
  data-logo-src="${contentModel.logoImage_s!"/static-assets/images/gotyme-logo-black.svg"}"
  data-location="${contentModel.location_s!"Hong Kong"}"
  data-cta-label="${contentModel.ctaLabel_s!"Partner with us"}"
  data-cta-url="${contentModel.ctaUrl_s!"#"}"
></div>
