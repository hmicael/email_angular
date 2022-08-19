import { VirtualAlias } from "./virtual-alias.model";
import { VirtualForward } from "./virtual-forward.model";
import { VirtualUser } from "./virtual-user.model";

export class DomainName {
  id!: number;
  name!: string;
  virtualUsers!: VirtualUser[];
  virtualAliases!: VirtualAlias[];
  virtualForwards!: VirtualForward[];
}
