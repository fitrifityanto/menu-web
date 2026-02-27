export interface Category {
  ID: number;
  name: string;
}

export interface MenuItem {
  ID: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_available: boolean;
  categories: Category[];
}

export interface ApiResponse {
  message: string;
  data: MenuItem[];
}
