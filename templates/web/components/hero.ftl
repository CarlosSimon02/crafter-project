<#import "/templates/system/common/crafter.ftl" as crafter />
<#assign headline           = contentModel.headline_s!"Small for small businesses." />
<#assign headlineMobile1    = contentModel.headlineMobileLine1_s!"Small growth for" />
<#assign headlineMobile2    = contentModel.headlineMobileLine2_s!"small businesses" />
<#assign subtitle1          = contentModel.subtitle1_s!"GoTyme Merchant Cash Advance Asia is a regional provider of fast, flexible financing built for SMEs." />
<#assign subtitle2          = contentModel.subtitle2_s!"" />
<#assign bgImage            = contentModel.backgroundImageDesktop_s!"/static-assets/images/hero-background.webp" />

<#--
  Hero is a flex column with two children:
    1. .hero-content   — text block at the top, intrinsic height.
    2. .hero-image-area — image at natural aspect ratio (w-full h-auto),
       so the section height grows / shrinks dynamically as the viewport
       width changes. Nothing is cropped — the full image is always shown.

  Because text and image live in separate flex children that stack
  naturally, they can never overlap. If a translation makes the
  headline / subtitle longer, the section grows; if the viewport is
  narrower, the image shrinks proportionally.
-->
<section class="
  hero relative overflow-hidden flex flex-col bg-[#00f5fa]
  mx-auto mb-6
  w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-[1216px]
  rounded-2xl sm:rounded-3xl lg:rounded-[32px]
">
  <#-- Text block — pinned to the top, sized by its content. -->
  <div class="
    relative z-[2]
    w-full
    px-4 sm:px-5 lg:px-10
    pt-12 sm:pt-16 lg:pt-20
    pb-6 sm:pb-8 lg:pb-10
    flex flex-col items-center text-center
    shrink-0
  ">
    <h1 class="
      flex flex-col items-center
      font-bold text-black tracking-[-0.02em]
      text-[8vw] leading-[1.1]
      sm:text-[38px] sm:leading-[1.2]
      md:text-[46px]
      lg:text-[52px]
      xl:text-[66px] xl:leading-[1.25]
    ">
      <#-- Mobile: explicit two-line break via separate fields. Desktop: single headline. -->
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

  <#-- Image area — transparent WebP, natural aspect ratio, full width. -->
  <div class="w-full">
    <img
      src="${bgImage}"
      alt=""
      loading="eager"
      decoding="async"
      width="2400"
      height="903"
      class="block w-full h-auto">
  </div>
</section>
