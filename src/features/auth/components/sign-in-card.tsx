import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SignInFlow } from "../types";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignInCard = ({ setState }: SignInCardProps) => {
  return (
    <Card style={{ width: "100%", height: "100%", padding: "32px" }}>
      <CardHeader style={{ paddingLeft: "0", paddingTop: "0" }}>
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          paddingLeft: "0",
          paddingBottom: "0",
        }}
      >
        <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Input
            disabled={false}
            value=""
            onChange={() => {}}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            disabled={false}
            value=""
            onChange={() => {}}
            placeholder="Password"
            type="password"
            required
          />
          <Button
            type="submit"
            style={{ width: "100%", fontSize: "18px" }}
            disabled={false}
          >
            Continue
          </Button>
        </form>
        <Separator />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            position: "relative",
          }}
        >
          <Button
            disabled={false}
            onClick={() => {}}
            variant="outline"
            size="lg"
            style={{ width: "100%" }}
          >
            <FcGoogle
              style={{ position: "absolute", top: "15px", left: "10px" }}
            />
            Continue with Google
          </Button>

          <Button
            disabled={false}
            onClick={() => {}}
            variant="outline"
            size="lg"
            style={{ width: "100%", position: "relative" }}
          >
            <FaGithub
              style={{ position: "absolute", top: "15px", left: "10px" }}
            />
            Continue with Github
          </Button>
        </div>
        <p className="tex-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => setState("signUp")}
            className="text-sky-700 hover:underline cursor-pointer"
          >
            {" "}
            Sign up{" "}
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
