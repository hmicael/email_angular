import { DomainName } from "./domain-name.model";
import { VirtualAlias } from "./virtual-alias.model";
import { VirtualForward } from "./virtual-forward.model";

export class VirtualUser {
  id!: number;
  name!: string;
  firstname!: string;
  email!: string;
  maildir!: string;
  active!: boolean;
  domainName!: DomainName;
  virtualAliases!: VirtualAlias[];
  virtualForwards!: VirtualForward[];
}
