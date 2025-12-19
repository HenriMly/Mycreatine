export interface CreateOrderDto {
  data: {
      // Informations du client
      customer: {
        name: string;
        email: string;
        address: string;
        city: string;
        state: string;
        zip: string;
        country: string;
      };
      // TODO : Modifier le type en fonction du projet
      // Créatine : creatine-products
      // Poké : poke-products
      // Cookie : cookie-products & topping-products
      creatine_products: {
        // IDs des produits
        connect: string[];
      };
      // Quantités des produits
      productsQuantity: {
        data: ProductsQuantity[];
      };
      // Prix total
      total: number;
  };
}

export interface ProductsQuantity {
  id: string;
  quantity: number;
}

export interface Order {
  data: {
    // IDs des produits
    // TODO : Modifier le type en fonction du projet
    // Créatine : creatine-products
    // Poké : poke-products
    // Cookie : cookie-products & topping-products
    creatine_products: string[];
    // Informations du client
    customer: {
      name: string;
      email: string;
      address: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
    // Quantités des produits
    productsQuantity: {
      data: ProductsQuantity[];
    };
    // Prix total
    total: number;
  };
}
