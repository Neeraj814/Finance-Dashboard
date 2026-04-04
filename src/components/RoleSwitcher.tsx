
import { Shield, Eye } from "lucide-react";
import { useFinance } from "@/store/FinanceContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Role } from "@/types/finance";

export function RoleSwitcher() {
  const { role, setRole } = useFinance();

  return (
    <div className="flex items-center gap-2">
      <Select value={role} onValueChange={(v) => setRole(v as Role)}>
        <SelectTrigger className="w-[130px] h-9">
          {role === "admin" ? (
            <Shield className="h-4 w-4 mr-2 text-primary" />
          ) : (
            <Eye className="h-4 w-4 mr-2 text-muted-foreground" />
          )}
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="viewer">Viewer</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
