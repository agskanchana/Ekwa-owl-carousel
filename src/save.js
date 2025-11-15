import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

/**
 * This block is now rendered server-side via render.php
 * Returning null here tells WordPress to use the PHP render callback
 */
export default function save() {
  return <InnerBlocks.Content />;
}
