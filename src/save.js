import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
export default function save({ attributes }) {
  const {
    blockID,
    nextBtnSvg,
    prevBtnSvg,
    loop,
    itemPerDesktop,
    itemPerTab,
    itemPerMobile,
    autoplay,
    dots,
    nav,
    margin,
  } = attributes;
  const carouselID = "bizg-" + blockID + "-carousel";
  const carouselClass = "owl-carousel owl-theme " + carouselID;
  let blockProps = useBlockProps.save({
    className: carouselClass,
  });

  return (
    <>
      <script>
        {`
	
         owlSettings.push({
			"nav_id"			:	"${blockID}",
            "class"             :  	"${carouselID}",
            "loop"              :   ${loop},
            "per_page_desktop"  :   ${itemPerDesktop},
            "per_page_tab"      :   ${itemPerTab},
            "per_page_mobile"   :   ${itemPerMobile},
            "autoplay"          :   ${autoplay},
            "dots"              :   ${dots},
            "navigation"        :   ${nav},
            "margin"            :   ${margin},   
         });
    
        `}
      </script>
      <div className="owl-bzgrw-hide bizgrow-carousel-wrapper">
        <div {...blockProps}>
          <InnerBlocks.Content />
        </div>

        {prevBtnSvg ? (
          <span
            className={`bizgrow-${blockID}-prev bizg-owl-prev`}
            dangerouslySetInnerHTML={{ __html: prevBtnSvg }}
          ></span>
        ) : null}
        {nextBtnSvg ? (
          <span
            className={`bizgrow-${blockID}-next bizg-owl-next`}
            dangerouslySetInnerHTML={{ __html: nextBtnSvg }}
          ></span>
        ) : null}
      </div>
    </>
  );
}
