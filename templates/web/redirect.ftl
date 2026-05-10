<#assign locale = contentModel.defaultLocale_s!"en" />
<#assign target = "/" + locale + "/" />
<#-- HTTP 302 — followed by social crawlers (Facebook, LinkedIn, Twitter)
     so the OG/Twitter card preview comes from the destination page,
     not this redirect stub. -->
<#assign _ = response.sendRedirect(target) />
