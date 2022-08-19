import { DomainName } from "./domain-name.model";
import { VirtualUser } from "./virtual-user.model";

export class VirtualForward {
  id!: number;
  source!: string;
  domainName!: DomainName;
  virtualUsers!: VirtualUser[];
}
