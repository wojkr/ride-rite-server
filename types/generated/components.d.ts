import type { Schema, Attribute } from '@strapi/strapi';

export interface BillingAddressBillingAddress extends Schema.Component {
  collectionName: 'components_billing_address_billing_addresses';
  info: {
    displayName: 'billingAddress';
    icon: 'gate';
  };
  attributes: {
    firstName: Attribute.String & Attribute.Required;
    lastName: Attribute.String & Attribute.Required;
    country: Attribute.String & Attribute.Required;
    buildingNumber: Attribute.String & Attribute.Required;
    street1: Attribute.String & Attribute.Required;
    street2: Attribute.String;
    city: Attribute.String & Attribute.Required;
    postCode: Attribute.String & Attribute.Required;
  };
}

export interface ShippingAddressShippingAddress extends Schema.Component {
  collectionName: 'components_shipping_address_shipping_addresses';
  info: {
    displayName: 'shippingAddress';
    icon: 'exit';
  };
  attributes: {
    isSameAddress: Attribute.Boolean;
    firstName: Attribute.String;
    lastName: Attribute.String;
    country: Attribute.String;
    buildingNumber: Attribute.String;
    street1: Attribute.String;
    street2: Attribute.String;
    city: Attribute.String;
    postCode: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'billing-address.billing-address': BillingAddressBillingAddress;
      'shipping-address.shipping-address': ShippingAddressShippingAddress;
    }
  }
}
