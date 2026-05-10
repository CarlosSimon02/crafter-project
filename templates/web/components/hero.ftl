<#import "/templates/system/common/crafter.ftl" as crafter />
<#assign headline           = contentModel.headline_s!"Big growth for small businesses." />
<#assign headlineMobile1    = contentModel.headlineMobileLine1_s!"Big growth for" />
<#assign headlineMobile2    = contentModel.headlineMobileLine2_s!"small businesses" />
<#assign subtitle1          = contentModel.subtitle1_s!"GoTyme Merchant Cash Advance Asia is a regional provider of fast, flexible financing built for SMEs." />
<#assign subtitle2          = contentModel.subtitle2_s!"" />
<#assign bgDesktop          = contentModel.backgroundImageDesktop_s!"/static-assets/images/hero-background.webp" />
<#assign bgTablet           = contentModel.backgroundImageTablet_s!"/static-assets/images/hero-background-1x.webp" />

<#--
  Layout (matching gotyme.com.hk):
    .hero          relative banner — h 653 desktop / 500 tablet / 400 mobile
    .hero-bg-color #00f5fa cyan fill
    .hero-bg-image picture: art-directed webp source for >=1024 / >=768 / fallback
    .hero-content  centered text block at top, padding-top 5rem desktop / 4rem mobile
-->
<section class="
  hero relative overflow-hidden flex items-start justify-start
  mx-auto mb-6
  w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-[1216px]
  h-[400px] sm:h-[500px] lg:h-[653px]
  rounded-2xl sm:rounded-3xl lg:rounded-[32px]
">
  <#-- hero-background — cyan fill + bg image stacked -->
  <div class="absolute inset-0 z-[1] overflow-hidden">
    <div class="absolute inset-0 bg-[#00f5fa] z-[1] rounded-2xl sm:rounded-3xl lg:rounded-[32px]"></div>
    <div class="absolute inset-0 z-[2] rounded-2xl sm:rounded-3xl lg:rounded-[32px]">
      <picture class="block w-full h-full">
        <source media="(min-width: 1024px)" srcset="${bgDesktop}" type="image/webp" sizes="1216px">
        <source media="(min-width: 768px)"  srcset="${bgTablet}"  type="image/webp" sizes="768px">
        <img
          src="${bgTablet}"
          alt=""
          loading="eager"
          decoding="async"
          width="1216"
          height="653"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 768px, 1216px"
          class="w-full h-full object-cover object-bottom rounded-2xl sm:rounded-3xl lg:rounded-[32px] [contain:layout]">
      </picture>
    </div>
  </div>

  <#-- hero-content — centered text on top of background -->
  <div class="relative z-[3] w-full max-w-[calc(100%-2rem)] sm:max-w-[calc(100%-2.5rem)] lg:max-w-[calc(100%-80px)] mx-auto pt-16 sm:pt-20 flex flex-col items-center text-center">
    <h1 class="
      flex flex-col items-center
      font-bold text-black tracking-[-0.02em]
      text-[8vw] leading-[1.1]
      sm:text-[38px] sm:leading-[1.2]
      md:text-[46px]
      lg:text-[52px]
      xl:text-[66px] xl:leading-[1.25]
    ">
      <#-- Mobile gets two lines via separate fields. Desktop shows the single headline. -->
      <span class="sm:hidden">${headlineMobile1}<br>${headlineMobile2}</span>
      <span class="hidden sm:inline">${headline}</span>
    </h1>

    <p class="
      font-normal text-black w-full max-w-[704px] mx-auto
      text-base leading-[1.2] mt-5
      sm:text-lg sm:leading-[1.3] sm:mt-3
      md:text-[22px]
      lg:text-2xl
      xl:text-[26px]
    ">
      ${subtitle1}
      <#if subtitle2?has_content>
        <br>${subtitle2}
      </#if>
    </p>
  </div>
</section>
