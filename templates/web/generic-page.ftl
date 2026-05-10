<#import "/templates/system/common/crafter.ftl" as crafter />
<!DOCTYPE html>
<html lang="en" data-craftercms-preview="${modePreview?c}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <#assign pageTitle = contentModel.seoTitle_s!contentModel["internal-name"]!"" />
    <#assign pageDescription = contentModel.metaDescription_s!"" />
    <#assign pageUrl = "https://${request.serverName}${request.requestURI}" />
    <title>${pageTitle}</title>
    <#if pageDescription?has_content>
      <meta name="description" content="${pageDescription}">
    </#if>
    <#if (contentModel.noIndex_b)!false>
      <meta name="robots" content="noindex">
    </#if>
    <link rel="canonical" href="${pageUrl}">
    <#if pageTitle?has_content>
      <meta property="og:title" content="${pageTitle}">
    </#if>
    <#if pageDescription?has_content>
      <meta property="og:description" content="${pageDescription}">
    </#if>
    <#if contentModel.ogImage_s?has_content>
      <meta property="og:image" content="${contentModel.ogImage_s}">
    </#if>
    <meta name="twitter:card" content="summary_large_image">
    <link rel="stylesheet" href="/static-assets/js/app.css">
    <@crafter.head/>
  </head>
  <body>
    <@crafter.body_top/>

    <#assign headerItems = (contentModel.header_o.item)![] />
    <#if headerItems?is_sequence && headerItems?has_content>
      <@renderComponent parent=contentModel component=headerItems?first />
    <#elseif headerItems?is_hash>
      <@renderComponent parent=contentModel component=headerItems />
    </#if>

    <@crafter.div $field="containerSection_o">
      <#list (contentModel.containerSection_o.item)![] as section>
        <#assign index = section?index />
        <@crafter.div $field="containerSection_o" $index=index>
          <@renderComponent parent=contentModel component=section />
        </@crafter.div>
      </#list>
    </@crafter.div>

    <#if contentModel.footer_o?? && contentModel.footer_o.item??>
      <@renderComponent component=contentModel.footer_o.item />
    </#if>

    <script src="/static-assets/js/app.js" defer></script>
    <@crafter.body_bottom/>
  </body>
</html>
