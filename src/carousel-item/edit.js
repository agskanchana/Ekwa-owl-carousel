import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";


export default function Edit({ attributes, setAttributes, context   }){

    const blockProps = useBlockProps( {
        className: 'bizgrow-carousel-item',
    } );
  const  CAROUSEL_ITEMS_TEMPLATE = [
		[ 'core/heading', { placeholder: 'Carousel item' } ]
	];

    return <div {...blockProps}>
        <InnerBlocks
          template={ CAROUSEL_ITEMS_TEMPLATE }
        />
    </div >
} 