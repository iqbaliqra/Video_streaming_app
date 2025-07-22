export interface User {
  uid: string;
  displayName: string;
  email: string;
  isExtAuth: boolean;
  subscriptionStatus: "inactive" | "active";
  subscriptionPlan: string;
}
