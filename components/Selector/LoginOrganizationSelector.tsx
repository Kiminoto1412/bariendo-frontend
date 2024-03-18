import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAlert } from "@/stores/use-alert-store";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

function LoginOrganizationSelector() {
  const { onCloseAlert } = useAlert();
  const { data: session, update, status } = useSession();
  const handleChangeOrganization = (value: any) => {
    const userData = { ...session?.user, organization: value };
    update({
      accessToken: session?.accessToken,
      user: userData,
    });
    onCloseAlert();
    redirect("/home/booked-appointment");
  };

  useEffect(() => {
    if (status !== "authenticated") return;
  }, [status]);

  return (
    <div className="flex items-center space-x-2 px-4 pb-8">
      <div className="text-sm font-bold">User role</div>
      <Select onValueChange={(value) => handleChangeOrganization(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select your user role" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {session?.user.userOrganizations?.map((userOrganization, id) => {
              return (
                <SelectItem
                  key={id}
                  value={userOrganization.organization as any}
                >
                  {userOrganization.organization.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default LoginOrganizationSelector;
