
import { Panel, PanelBody,  RangeControl, ToggleControl, TextareaControl, ToolbarButton   } from '@wordpress/components';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
export default function Edit( { attributes, setAttributes, clientId } ) {
	const { numSlides, blockID, nextBtnSvg, prevBtnSvg, loop, itemPerDesktop, itemPerTab,  itemPerMobile, autoplay, dots, nav, margin} = attributes;
	setAttributes({blockID: clientId})
	const blockProps = useBlockProps();
	const CAROUSEL_ITEMS_TEMPLATE = [
		[ 'ekwa-blocks/carousel-item', {} ],
		[ 'ekwa-blocks/carousel-item', {} ]
	];
	const carouselID = 'ekwa-' + blockID + '-carousel';
	const carouselClass = 'owl-carousel owl-theme ' + carouselID;







	return (
		<>
		<InspectorControls>

			<Panel>
				<PanelBody
				title='Loop'
				initialOpen={ false }
				>
				<ToggleControl
					label="Carousel Loop"
					help={
						loop
							? 'True.'
							: 'False.'
					}
					checked={ loop }
					onChange={ (state) => {
						 setAttributes({loop: state})
					} }
       			 />

				</PanelBody>
			</Panel>
			<Panel>
				<PanelBody
				title='Sliders Per Device'
				initialOpen={ false }
				>
				<RangeControl
					label="Slides per Desktop"
					value={ itemPerDesktop }
					onChange={ ( value ) => setAttributes({itemPerDesktop: value}) }
					min={ 1 }
					max={ 20 }
        		/>
				<RangeControl
					label="Slides per Tab"
					value={ itemPerTab }
					onChange={ ( value ) => setAttributes({itemPerTab: value}) }
					min={ 1 }
					max={ 20 }
        		/>
				<RangeControl
					label="Slides per Mobile"
					value={ itemPerMobile }
					onChange={ ( value ) => setAttributes({itemPerMobile: value}) }
					min={ 1 }
					max={ 20 }
        		/>
				</PanelBody>
			</Panel>
			<Panel>
				<PanelBody
				title='Auto Play'
				initialOpen={ false }
				>
				<ToggleControl
					label="Carousel Autoplay"
					help={
						autoplay
							? 'True.'
							: 'False.'
					}
					checked={ autoplay }
					onChange={ (state) => {
						 setAttributes({autoplay: state})
					} }
       			 />
				</PanelBody>
			</Panel>
			<Panel>
				<PanelBody
				title='Dots'
				initialOpen={ false }
				>
				<ToggleControl
					label="Carousel Dots"
					help={
						dots
							? 'True.'
							: 'False.'
					}
					checked={ dots }
					onChange={ (state) => {
						 setAttributes({dots: state})
					} }
       			 />
				</PanelBody>
			</Panel>
			<Panel>
				<PanelBody
				title='Navigation'
				initialOpen={ false }
				>
				<ToggleControl
					label="Carousel navigation"
					help={
						nav
							? 'True.'
							: 'False.'
					}
					checked={ nav }
					onChange={ (state) => {
						 setAttributes({nav: state})
					} }
       			 />
				</PanelBody>
			</Panel>
			<Panel>
				<PanelBody
				title='Margin between items'
				initialOpen={ false }
				>
				<RangeControl
					label="Margin"
					value={ margin }
					onChange={ ( value ) => setAttributes({margin: value}) }
					min={ 0 }
					max={ 200 }
        		/>
				</PanelBody>
			</Panel>
			<Panel>
				<PanelBody
				 title='Custom Navigation Icon '
				 initialOpen={ false }
				 >
				<TextareaControl
					label="SVG Prev Icon"
					help="Enter svg code"
					value={ prevBtnSvg }
					onChange={ ( value ) => setAttributes( {prevBtnSvg: value} ) }
        		/>
				<br />
				<TextareaControl
					label="SVG Next Icon"
					help="Enter svg code"
					value={ nextBtnSvg }
					onChange={ ( value ) => setAttributes( {nextBtnSvg: value} ) }
        		/>


				</PanelBody>
			</Panel>
		</InspectorControls>

		<script>{`
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
	<div className=' ekwa-carousel-wrapper'>
		<div  { ...blockProps }>
		<InnerBlocks
			allowedBlocks={['ekwa-blocks/carousel-item']}
			template={ CAROUSEL_ITEMS_TEMPLATE }
			renderAppender={ InnerBlocks.ButtonBlockAppender }
		/>
		</div>


		{prevBtnSvg
        ? <span className={`ekwa-${blockID}-prev ekwa-owl-prev`} dangerouslySetInnerHTML={{ __html: prevBtnSvg }}></span>
        : null
      	}
		{nextBtnSvg
		 ? <span className={`ekwa-${blockID}-next ekwa-owl-next`} dangerouslySetInnerHTML={{ __html: nextBtnSvg }}></span>
		 : null
		}
	</div>
		</>
	);
}
