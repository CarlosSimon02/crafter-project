<#import "/templates/system/common/crafter.ftl" as crafter />
<#assign headline    = contentModel.headline_s!"The Business Account That Works As Hard As You" />
<#assign subtext     = contentModel.subtext_s!"GoTyme Business empowers SMEs with a smarter, more accessible banking solution." />
<#assign ctaLabel    = contentModel.ctaLabel_s!"Get started" />
<#assign ctaUrl      = contentModel.ctaUrl_s!"#" />
<#assign bgImage     = contentModel.backgroundImage_s!"/static-assets/images/hero-background.webp" />
<#assign badge1      = contentModel.badge1Label_s!"Open in minutes" />
<#assign badge2      = contentModel.badge2Label_s!"Available 24/7" />
<#assign badge3      = contentModel.badge3Label_s!"Zero monthly fees" />
<#assign headlineParts = headline?split("|") />

<@crafter.componentRootTag componentId="${contentModel.objectId}">
<section
  class="relative min-h-[600px] lg:min-h-[680px] flex flex-col overflow-hidden bg-charcoal"
  style="background-image: url('${bgImage}'); background-size: cover; background-position: center left;"
>
  <div class="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-transparent lg:from-transparent"></div>

  <div class="relative z-10 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto w-full px-6 py-16 lg:py-24 gap-10 flex-1">
    <div class="hidden lg:block lg:flex-1"></div>

    <div class="w-full lg:w-[480px] xl:w-[520px] bg-white rounded-3xl px-8 py-10 lg:px-10 lg:py-12 shadow-2xl flex flex-col gap-6">
      <@crafter.h1 $field="headline_s" class="text-3xl lg:text-4xl xl:text-5xl font-bold text-charcoal leading-tight">
        <#list headlineParts as part>
          ${part?trim}<#if part?has_next><br></#if>
        </#list>
      </@crafter.h1>

      <@crafter.p $field="subtext_s" class="text-base lg:text-lg text-text-grey leading-relaxed">
        ${subtext}
      </@crafter.p>

      <#if ctaLabel?has_content>
        <a href="${ctaUrl}" class="inline-flex items-center justify-center gap-2 bg-charcoal text-white text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-charcoal/90 transition-colors w-fit">
          ${ctaLabel}
          <span aria-hidden="true">→</span>
        </a>
      </#if>

      <div class="flex flex-wrap gap-3 pt-2 border-t border-light-grey">
        <#if badge1?has_content>
          <div class="flex items-center gap-2 text-xs font-medium text-charcoal">
            <img src="/static-assets/images/clock-icon-new.svg" alt="" class="w-5 h-5 shrink-0" aria-hidden="true">
            <span>${badge1}</span>
          </div>
        </#if>
        <#if badge2?has_content>
          <div class="flex items-center gap-2 text-xs font-medium text-charcoal">
            <img src="/static-assets/images/calendar-icon.svg" alt="" class="w-5 h-5 shrink-0" aria-hidden="true">
            <span>${badge2}</span>
          </div>
        </#if>
        <#if badge3?has_content>
          <div class="flex items-center gap-2 text-xs font-medium text-charcoal">
            <img src="/static-assets/images/fee-icon.svg" alt="" class="w-5 h-5 shrink-0" aria-hidden="true">
            <span>${badge3}</span>
          </div>
        </#if>
      </div>
    </div>
  </div>
</section>
</@crafter.componentRootTag>
