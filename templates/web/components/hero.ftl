<#import "/templates/system/common/crafter.ftl" as crafter />
<#assign headline           = contentModel.headline_s!"Big growth for small businesses." />
<#assign headlineMobile1    = contentModel.headlineMobileLine1_s!"Big growth for" />
<#assign headlineMobile2    = contentModel.headlineMobileLine2_s!"small businesses" />
<#assign subtitle1          = contentModel.subtitle1_s!"GoTyme Merchant Cash Advance Asia is a regional provider of fast, flexible financing built for SMEs." />
<#assign subtitle2          = contentModel.subtitle2_s!"" />
<#assign bgDesktop          = contentModel.backgroundImageDesktop_s!"/static-assets/images/hero-background.webp" />
<#assign bgTablet           = contentModel.backgroundImageTablet_s!"/static-assets/images/hero-background-1x.webp" />

<#--
  Hero is a flex column with two children:
    1. .hero-content — text block at the top, takes its natural height.
    2. .hero-image-area — fills the remaining space (flex-1), holds the
       background image. Because text and image live in separate flex
       children, they can NEVER overlap — even if the headline / subtitle
       grows longer (more lines, longer translations), the image area
       just shrinks accordingly.

  Heights mirror gotyme.com.hk:
    < 640px → 400px,  640-1023px → 500px,  ≥ 1024px → 653px.
-->
<section class="
  hero relative overflow-hidden flex flex-col bg-[#00f5fa]
  mx-auto mb-6
  w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-[1216px]
  h-[400px] sm:h-[500px] lg:h-[653px]
  rounded-2xl sm:rounded-3xl lg:rounded-[32px]
">
  <#-- Text block — pinned to the top, sized by its content. -->
  <div class="
    relative z-[2]
    w-full
    px-4 sm:px-5 lg:px-10
    pt-16 sm:pt-20
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

  <#-- Image area — fills remaining space, image cropped only inside this box. -->
  <div class="relative flex-1 min-h-0 w-full overflow-hidden">
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
        class="absolute inset-0 w-full h-full object-cover object-bottom">
    </picture>
  </div>
</section>
