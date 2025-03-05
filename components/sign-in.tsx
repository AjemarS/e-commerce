import { signIn } from "@/lib/auth";
import { Button } from "./ui/button";

export default function SignIn() {
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signIn();
        }}
      >
        <Button type="submit">Sign In</Button>
      </form>
    </div>
  );
}
