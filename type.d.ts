// Params for updating user profile
export interface UpdateUserProfileParams {
  name: string;
  email: string;
  phoneNumber?: string;
  address1?: string;
  address2?: string;
}

// Function signature for updating user profile
export type UpdateUserProfileFn = (
  params: UpdateUserProfileParams,
) => Promise<User>;
import { Models } from "react-native-appwrite";

export interface MenuItem extends Models.Document {
  name: string;
  price: number;
  image_url: string;
  description: string;
  calories: number;
  proteins: number;
  rating: number;
  type: string;
}

export interface Category extends Models.Document {
  name: string;
  description: string;
}

export interface User extends Models.Document {
  name: string;
  email: string;
  avatar: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: Date;
  address1: string;
  address2: string;
}

export interface CartCustomization {
  id: string;
  name: string;
  price: number;
  type: string;
}

export interface CartItemType {
  id: string; // menu item id
  name: string;
  price: number;
  image_url: string;
  quantity: number;
  customizations?: CartCustomization[];
}

export interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string, customizations: CartCustomization[]) => void;
  increaseQty: (id: string, customizations: CartCustomization[]) => void;
  decreaseQty: (id: string, customizations: CartCustomization[]) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

interface TabBarIconProps {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
}

interface PaymentInfoStripeProps {
  label: string;
  value: string;
  labelStyle?: string;
  valueStyle?: string;
}

interface CustomButtonProps {
  onPress?: () => void;
  title?: string;
  style?: string;
  leftIcon?: React.ReactNode;
  textStyle?: string;
  isLoading?: boolean;
}

interface CustomHeaderProps {
  title?: string;
  className?: string;
  icon?: React.ReactNode;
}

interface CustomInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  label: string;
  secureTextEntry?: boolean;
  className?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

interface ProfileFieldProps {
  label: string;
  value: string;
  icon: ImageSourcePropType;
}

interface CreateUserParams {
  email: string;
  name: string;
  password: string;
}

interface SignInParams {
  email: string;
  password: string;
}

interface GetMenuParams {
  category: string;
  query: string;
}
