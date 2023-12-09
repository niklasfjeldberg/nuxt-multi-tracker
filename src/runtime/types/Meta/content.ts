/**
 * Content is part of the Custom Data Parameters of a Conversions API Event Request. Content can be used to set the item/product details added in the Custom Data.
 * @see {@link https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/custom-data#contents}
 */
export interface Content {
  _id: string;
  _quantity: number;
  _item_price: number;
  _title: string;
  _description: string;
  _category: string;
  _brand: string;
  _delivery_category: string;
}
/**
 * @param {String} id Product Id of the Item.
 * @param {Number} quantity Quantity of the Item.
 * @param {Number} item_price Price per unit of the content/product.
 * @param {String} title Title of the listed Item.
 * @param {String} description Product description used for the item.
 * @param {String} brand Brand of the item.
 * @param {String} category Category of the Item.
 * @param {String} delivery_category The type of delivery for a purchase event
 */
