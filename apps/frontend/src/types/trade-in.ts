export interface ComputerFormData {
  brand: string;
  model: string;
  processor: string;
  ram: string;
  storageType: string;
  storageSize: string;
  screenSize: string;
  operatingSystem: string;
  purchaseYear: string;
  autoOnOff: string;
  bodyCondition: string;
  screenCondition: string;
  repairVisits: string;
  biometricFunction: string;
}

export interface TradeInField {
  label: string;
  name: string;
  type: "select" | "text" | "file";
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  accept?: string;
  helperText?: string;
}

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  availability: string;
  stock: number;
  isTopSale: boolean;
  tag: string;
}
