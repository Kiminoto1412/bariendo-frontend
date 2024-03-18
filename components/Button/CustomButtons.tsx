import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ICustomButton {
  handleClick?: () =>
    | void
    | Promise<void>
    | React.Dispatch<React.SetStateAction<boolean>>;
  isActive?: boolean;
  label: string;
  icon?: keyof typeof LucideIcons;
  customStyle?: string;
  hasDisabled?: boolean;
  isHidden?: boolean;
}

interface ICustomButtonsProps {
  buttonProps: ICustomButton[];
  disabled?: boolean;
}
export function CustomButtons({ buttonProps, disabled }: ICustomButtonsProps) {
  const searchButtonStyle =
    "text-xs font-bold flex items-center justify-center gap-x-1 h-8 bg-blue-500 hover:bg-blue-400";

  return (
    <div className="flex items-center gap-x-2 mt-4">
      {buttonProps.map((button, index) => {
        const IconComponent = button.icon
          ? (LucideIcons[button.icon] as React.ElementType)
          : null;

        return button.isHidden ? null : (
          <Button
            key={index}
            className={`${searchButtonStyle} ${button.customStyle} `}
            onClick={button.handleClick}
            disabled={disabled && button.hasDisabled}
          >
            {IconComponent && <IconComponent className="h-4 w-4 font-bold" />}
            <div>{button.label}</div>
          </Button>
        );
      })}
    </div>
  );
}
