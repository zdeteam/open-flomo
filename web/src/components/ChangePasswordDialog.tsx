import { useEffect, useState } from "react";
import { validate, ValidatorConfig } from "../helpers/validator";
import useI18n from "../hooks/useI18n";
import { userService } from "../services";
import Icon from "./Icon";
import Input from "./common/Input";
import Button from "./common/Button";
import { generateDialog } from "./Dialog";
import toastHelper from "./Toast";
import "../less/change-password-dialog.less";

const validateConfig: ValidatorConfig = {
  minLength: 4,
  maxLength: 24,
  noSpace: true,
  notEmpty: true,
  noChinese: true,
};

interface Props extends DialogProps {}

const ChangePasswordDialog: React.FC<Props> = ({ destroy }: Props) => {
  const { t } = useI18n();
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");

  useEffect(() => {
    // do nth
  }, []);

  const handleCloseBtnClick = () => {
    destroy();
  };

  const handleNewPasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value as string;
    setNewPassword(text);
  };

  const handleNewPasswordAgainChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value as string;
    setNewPasswordAgain(text);
  };

  const handleSaveBtnClick = async () => {
    if (newPassword === "" || newPasswordAgain === "") {
      toastHelper.error("Please fill in all fields.");
      return;
    }

    if (newPassword !== newPasswordAgain) {
      toastHelper.error("New passwords do not match.");
      setNewPasswordAgain("");
      return;
    }

    const passwordValidResult = validate(newPassword, validateConfig);
    if (!passwordValidResult.result) {
      toastHelper.error("Password " + passwordValidResult.reason);
      return;
    }

    try {
      const user = userService.getState().user as User;
      await userService.patchUser({
        id: user.id,
        password: newPassword,
      });
      toastHelper.info("Password changed.");
      handleCloseBtnClick();
    } catch (error: any) {
      console.error(error);
      toastHelper.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="dialog-content-container">
        <Input fullWidth type="password" placeholder="New passworld" value={newPassword} onChange={handleNewPasswordChanged} />
        <Input
          fullWidth
          type="password"
          placeholder="Repeat the new password"
          value={newPasswordAgain}
          onChange={handleNewPasswordAgainChanged}
        />
        <div className="btns-container">
          <Button fullWidth onClick={handleSaveBtnClick}>
            {t("common.save")}
          </Button>
        </div>
      </div>
    </>
  );
};

function showChangePasswordDialog() {
  generateDialog(
    {
      title: "Change Password",
      className: "change-password-dialog",
    },
    ChangePasswordDialog
  );
}

export default showChangePasswordDialog;
