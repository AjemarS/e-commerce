import type { AdapterUser as BaseAdapterUser } from "next-auth/adapters";

declare module "@auth/core/adapters" {
  interface AdapterUser extends BaseAdapterUser {
    role: "user" | "admin";
  }
}
