const testData = {
  smoke_search_query: "high winds",
  smoke_product: {
    title: "Hyperion Elements Jacket",
    size: "L",
    color: "Green",
    default_quantity: "1",
    url_parameter: "hyperion-elements-jacket.html",
  },
  user_credentials: {
    email: "hena.potogija@stu.ibu.edu.ba",
    password: "Testing123!",
    full_name: "Hena Testing",
  },
  homepage: {
    title: "What's New",
    url_parameter: "what-is-new.html",
  },
  shipping: {
    url_parameter: "checkout/#shipping",
    section_title: "Shipping Address",
    default_shipping_address: {
      first_name: "Hena",
      last_name: "Testing",
      address: "Address",
      city: "Sa",
      zip_code: "38949234",
      country: "United Arab Emirates",
      phone_number: "9834789435",
    },
  },
  payment: {
    url_parameter: "checkout/#payment",
    section_title: "Payment Method",
  },
  success_page: {
    url_parameter: "checkout/onepage/success/",
    success_message: "Thank you for your purchase!",
  },
};

export default testData;
