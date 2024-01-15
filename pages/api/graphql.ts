import { createYoga, createSchema } from "graphql-yoga";

const typeDefs = /* GraphQL */ `
  type Query {
    stores: [Store!]!
    products: [Product!]!
    owners: [Owner!]!
  }

  type Store {
    id: ID!
    name: String!
    locationPlace: String!
    owner: Owner!
  }

  type Product {
    id: ID!
    name: String!
    price: Int!
    hasStock: Boolean!
  }

  type Owner {
    id: ID!
    name: String!
    age: String
  }

  interface Character {
    id: ID!
    name: String!
  }

  input ReviewInput2 {
    stars: Int!
    commentary: String
  }

  enum AllowedColor {
    RED
    GREEN
    YELLOW
  }
`;

type Store = {
  id: string;
  name: string;
  locationPlace: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
  hasStock: boolean;
};

type Owner = {
  id: string;
  name: string;
  age?: number;
};

const stores: Store[] = [
  {
    id: "a4fcff37-cd71-4c76-9ff9-079fb4f118ca",
    name: "Meadow Market",
    locationPlace: "New York",
  },
  {
    id: "134928c6-91bf-47dc-9233-256eef00b315",
    name: "Blossom Bazaar",
    locationPlace: "Los Angeles",
  },
];

const products: Product[] = [
  {
    id: "7a6b136d-f611-4227-9311-a67243858998",
    name: "Unbranded Bronze Shirt",
    price: 100,
    hasStock: true,
  },
  {
    id: "e77d6ccd-7fd0-48e7-97e6-299e437e4d34",
    name: "Handcrafted Cotton Keyboard",
    price: 399,
    hasStock: true,
  },
  {
    id: "81f96851-a015-4213-9335-8afd20829ba6",
    name: "Fantastic Metal Car",
    price: 245,
    hasStock: false,
  },
];

const resolvers = {
  Query: {
    stores: () => stores,
    products: () => products,
  },
  Store: {
    id: (parent: Store) => parent.id,
    name: (parent: Store) => parent.name,
    locationPlace: (parent: Store) => parent.locationPlace,
  },
  Product: {
    id: (parent: Product) => parent.id,
    name: (parent: Product) => parent.name,
    price: (parent: Product) => parent.price,
    hasStock: (parent: Product) => parent.hasStock,
  },
};

const schema = createSchema({
  typeDefs,
  resolvers,
});

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

export default createYoga({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: "/api/graphql",
});
