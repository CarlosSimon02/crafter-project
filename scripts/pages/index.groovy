/*
 * Locale-redirect controller for the root /.
 *
 * Reads defaultLocale_s from the page contentModel (set in Studio via
 * the Locale Redirect form's "Default Locale" dropdown) and issues an
 * HTTP 302 to /{locale}/. HTTP redirects are honored by social
 * crawlers (Facebook, LinkedIn, Twitter), so previews of the bare /
 * URL show the OG tags of the destination locale.
 */

def locale = contentModel.queryValue("defaultLocale_s") ?: "en"
response.sendRedirect("/" + locale + "/")
