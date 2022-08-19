import { DomainName } from "./domain-name.model";
import { VirtualUser } from "./virtual-user.model";

export class VirtualAlias {
  id!: number;
  source!: string;
  domainName!: DomainName;
  virtualUsers!: VirtualUser[];
}
