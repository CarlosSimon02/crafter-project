<#import "/templates/system/common/crafter.ftl" as crafter />
<#-- Detect current locale from the first path segment of the request URI. -->
<#assign currentLocale = "en" />
<#list (request.requestURI?split("/"))![] as part>
  <#if part?has_content>
    <#assign currentLocale = part />
    <#break>
  </#if>
</#list>

<#-- Available locales list. Keep in sync with availableTargetIds in
     config/engine/site-config.xml and with the page-locale-redirect
     dropdown options. -->
<#assign locales = [
  {"code": "en", "label": "English",  "flag": "/static-assets/images/uk-flag.svg"},
  {"code": "zh", "label": "繁體中文", "flag": "/static-assets/images/hongkong-flag.svg"}
] />

<#assign current = locales[0] />
<#list locales as l>
  <#if l.code == currentLocale>
    <#assign current = l />
    <#break>
  </#if>
</#list>

<#assign logoSrc  = contentModel.logoImage_s!"/static-assets/images/gotyme-logo-black.svg" />
<#assign location = contentModel.location_s!"Hong Kong" />
<#assign ctaLabel = contentModel.ctaLabel_s!"Partner with us" />
<#assign ctaUrl   = contentModel.ctaUrl_s!"#" />

<header class="bg-cool-grey sticky top-0 z-[1000] rounded-2xl mx-2 my-2 px-3 py-2 w-[calc(100%-1rem)] h-auto sm:mx-4 sm:my-4 sm:px-4 sm:py-3 sm:w-[calc(100%-2rem)] md:mt-8 md:mb-6 md:mx-auto md:px-10 md:py-4 md:h-[90px] max-w-[1216px] flex items-center">
  <div class="flex items-center justify-between gap-1.5 sm:gap-2 md:gap-[1.375rem] w-full h-full">

    <a href="/${currentLocale}/" class="flex items-center shrink-0 no-underline text-charcoal min-w-0 gap-1.5 sm:gap-2 md:gap-[1.375rem] md:w-[19rem]">
      <img src="${logoSrc}" alt="GoTyme" width="129" height="32" class="h-5 sm:h-6 md:h-8 w-auto max-w-[60px] sm:max-w-[80px] md:max-w-[129px] cursor-pointer shrink-0">
      <span class="font-sans font-medium text-sm sm:text-base md:text-2xl leading-tight text-charcoal whitespace-nowrap">${location}</span>
    </a>

    <div class="flex items-center gap-1 sm:gap-1.5 md:gap-3 flex-shrink-0 flex-grow basis-0 md:flex-1 justify-end min-w-0">

      <a href="${ctaUrl}" class="inline-flex items-center justify-center bg-purple text-white font-sans font-bold leading-[1.4] no-underline rounded-full whitespace-nowrap text-[13px] px-4 py-3 md:text-xl md:gap-4 md:w-[207px] md:h-[60px] md:px-[22px] md:py-4 hover:bg-[#3a0bc7] hover:-translate-y-px transition-all duration-200">
        ${ctaLabel}
      </a>

      <div data-language-switcher class="relative inline-block">
        <button
          type="button"
          data-language-trigger
          aria-haspopup="listbox"
          aria-expanded="false"
          class="flex items-center justify-center cursor-pointer transition-colors duration-200 bg-transparent border-none p-0.5 w-7 h-7 rounded-full sm:p-1 sm:w-9 sm:h-9 md:bg-white md:hover:bg-light-grey md:rounded-full md:gap-2 md:w-[168px] md:h-[60px] md:p-0">
          <span class="w-6 h-6 flex items-center justify-center" style="filter: drop-shadow(0 2px 8px rgba(0,0,0,0.16));">
            <img src="${current.flag}" alt="" width="25" height="25" class="w-[25px] h-[25px] object-cover rounded-full">
          </span>
          <span class="hidden md:inline font-inter text-xs font-bold leading-[1.4] text-[#545464]">${current.label}</span>
          <span data-chevron class="hidden md:flex items-center justify-center ml-1 transition-transform duration-200">
            <svg class="w-3 h-3" viewBox="0 0 12 8" fill="none">
              <path d="M1 1l5 5 5-5" stroke="#545464" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </span>
        </button>

        <div data-language-dropdown hidden class="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] z-[1000] overflow-hidden min-w-[100px] sm:min-w-[120px] md:min-w-[168px] md:left-0 md:right-0">
          <#list locales as lang>
            <#assign isSelected = (lang.code == currentLocale) />
            <button type="button" data-language-option="${lang.code}" class="w-full bg-transparent border-none p-0 cursor-pointer hover:bg-light-grey transition-colors duration-200">
              <div class="flex items-center gap-1 sm:gap-2 md:gap-3 px-2 py-1.5 sm:px-3 sm:py-2 md:px-5 md:py-4 w-full">
                <span class="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center shrink-0" style="filter: drop-shadow(0 2px 8px rgba(0,0,0,0.16));">
                  <img src="${lang.flag}" alt="" width="24" height="24" class="w-full h-full object-cover">
                </span>
                <span class="font-inter text-[11px] sm:text-xs md:text-base leading-[1.4] text-[#545464] flex-1 text-left <#if isSelected>font-bold<#else>font-medium</#if>">${lang.label}</span>
                <#if isSelected>
                  <span class="flex items-center justify-center w-4 h-4 shrink-0">
                    <svg class="w-4 h-4 text-charcoal" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l4 4 6-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                </#if>
              </div>
            </button>
            <#if lang_index < locales?size - 1>
              <div class="h-px bg-[#e5e5e5] mx-2 sm:mx-3 md:mx-5"></div>
            </#if>
          </#list>
        </div>
      </div>
    </div>
  </div>
</header>
