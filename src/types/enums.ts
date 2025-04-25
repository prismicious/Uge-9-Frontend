export enum WineEndpoints {
  reds = "reds",
  whites = "whites",
  rose = "rose",
  sparkling = "sparkling",
  dessert = "dessert",
  port = "port"
}

export enum WineType {
  Red = "Red",
  White = "White",
  Rose = "Rosé",
  Sparkling = "Sparkling",
  Dessert = "Dessert",
  Port = "Port"
}

// Type-safe mapping between endpoints and display names
export const endpointToDisplayName: Record<WineEndpoints, WineType> = {
  [WineEndpoints.reds]: WineType.Red,
  [WineEndpoints.whites]: WineType.White,
  [WineEndpoints.rose]: WineType.Rose,
  [WineEndpoints.sparkling]: WineType.Sparkling,
  [WineEndpoints.dessert]: WineType.Dessert,
  [WineEndpoints.port]: WineType.Port
};