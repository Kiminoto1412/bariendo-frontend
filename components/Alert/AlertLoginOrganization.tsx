import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAlert } from "@/stores/use-alert-store";
import LoginOrganizationSelector from "../Selector/LoginOrganizationSelector";

function AlertLoginOrganization() {
  const { isOpenAlert, onCloseAlert, type } = useAlert();

  const isFinalAlertOpen = isOpenAlert && type === "loginOrganization";

  const handleClose = () => {
    onCloseAlert();
  };

  return (
    <AlertDialog open={isFinalAlertOpen} onOpenChange={handleClose}>
      <AlertDialogContent className="p-0">
        <AlertDialogHeader>
          <AlertDialogTitle className="p-4 border-b-[1px]">
            Select User Role
          </AlertDialogTitle>
        </AlertDialogHeader>
        <LoginOrganizationSelector />
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertLoginOrganization;
