<#-- The HTTP 302 redirect is performed by scripts/pages/index.groovy
     before this template renders. This template only runs as a fallback
     if the redirect was somehow not issued (e.g. controller missing,
     contentModel without defaultLocale_s). -->
<#assign locale = contentModel.defaultLocale_s!"en" />
<#assign target = "/" + locale + "/" />
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting…</title>
  <meta http-equiv="refresh" content="0; url=${target}">
  <link rel="canonical" href="${target}">
  <script>window.location.replace("${target}");</script>
</head>
<body>
  <p>Redirecting to <a href="${target}">${target}</a>…</p>
</body>
</html>
