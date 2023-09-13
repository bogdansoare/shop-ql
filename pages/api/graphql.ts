import { createYoga, createSchema } from "graphql-yoga";

const typeDefs = /* GraphQL */ `
  type Query {
    products: [Product!]!
    payments: [Payment!]!
  }

  type Product {
    id: ID!
    name: String!
    price: Int!
    hasStock: Boolean!
  }

  type Payment {
    id: ID!
    amount: Int!
    status: String!
    products: [Product!]!
  }
`;

type Product = {
  id: string;
  name: string;
  price: number;
  hasStock: boolean;
};

type Payment = {
  id: string;
  amount: number;
  status: string;
  products: Product[];
};

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

const payments: Payment[] = [
  {
    id: "a4fcff37-cd71-4c76-9ff9-079fb4f118ca",
    amount: 100,
    status: "PAID",
    products: [products[0]],
  },
  {
    id: "134928c6-91bf-47dc-9233-256eef00b315",
    amount: 499,
    status: "PENDING",
    products: [products[0], products[1]],
  },
];

const resolvers = {
  Query: {
    products: () => products,
    payments: () => payments,
  },
  Product: {
    id: (parent: Product) => parent.id,
    name: (parent: Product) => parent.name,
    price: (parent: Product) => parent.price,
    hasStock: (parent: Product) => parent.hasStock,
  },
  Payment: {
    id: (parent: Payment) => parent.id,
    amount: (parent: Payment) => parent.amount,
    status: (parent: Payment) => parent.status,
    products: (parent: Payment) => parent.products,
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
