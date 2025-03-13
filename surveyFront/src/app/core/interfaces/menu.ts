export interface Menu {
  label: string;
  permissions?: string[],
  icon: string,
  routerLink?: string,
  children?: Menu[]
}
