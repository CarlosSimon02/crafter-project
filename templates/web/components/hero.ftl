<#import "/templates/system/common/crafter.ftl" as crafter />
<@crafter.componentRootTag componentId="${contentModel.objectId}">
  <div
    data-hero
    data-headline="${contentModel.headline_s!"The Business Account That Works As Hard As You"}"
    data-subtext="${contentModel.subtext_s!"GoTyme Business empowers SMEs with a smarter, more accessible banking solution."}"
    data-cta-label="${contentModel.ctaLabel_s!"Get started"}"
    data-cta-url="${contentModel.ctaUrl_s!"#"}"
    data-bg-image="${contentModel.backgroundImage_s!"/static-assets/images/hero-background.webp"}"
    data-badge1="${contentModel.badge1Label_s!"Open in minutes"}"
    data-badge2="${contentModel.badge2Label_s!"Available 24/7"}"
    data-badge3="${contentModel.badge3Label_s!"Zero monthly fees"}"
  ></div>
</@crafter.componentRootTag>
