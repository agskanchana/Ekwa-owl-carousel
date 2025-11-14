import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';


registerBlockType("bizgrow-blocks/carousel-item", {
    title: ("Carousel Item", "carousel-item"),
    description: ("Add an item to carousel", "carousel-item"),
    icon: "slides",
    parent: ["bizgrow-blocks/carousel"],
    supports: {
        reusable: false,
        html: false
    },
    attributes: {
        title: {
            type: "string",
            source: "html",
            selector: "h4"
        }
        
    },
   
    edit: Edit,
    save: save
})