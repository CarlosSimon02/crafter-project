<#import "/templates/system/common/crafter.ftl" as crafter />
<!DOCTYPE html>
<html lang="en" data-craftercms-preview="${modePreview?c}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${contentModel.seoTitle_s!contentModel.navLabel!""}</title>
    <#if contentModel.metaDescription_s?has_content>
      <meta name="description" content="${contentModel.metaDescription_s}">
    </#if>
    <#if (contentModel.noIndex_b)!false>
      <meta name="robots" content="noindex">
    </#if>
    <link rel="stylesheet" href="/static-assets/js/app.css">
    <@crafter.head/>
  </head>
  <body>
    <@crafter.body_top/>

    <#if contentModel.header_o?? && contentModel.header_o.item??>
      <@renderComponent component=contentModel.header_o.item />
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
