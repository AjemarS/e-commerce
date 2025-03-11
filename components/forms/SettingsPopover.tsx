import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";

interface SettingsPopoverProps {
  value: boolean;
  onChange: (newValue: boolean) => void;
}

const SettingsPopover: React.FC<SettingsPopoverProps> = ({ value, onChange }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Settings />
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex items-center space-x-2">
          <Switch id="reset-mode" checked={value} onCheckedChange={onChange} />
          <Label htmlFor="reset-mode">Reset form on every submit</Label>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SettingsPopover;
