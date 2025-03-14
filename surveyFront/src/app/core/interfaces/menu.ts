import {ICONS_TYPE} from "@core/typings/icons";

export type NavigationItemType = 'single' | 'multiple';

export type MenuItem = {
  label?: string;
  url?: string | undefined;
  icon?: ICONS_TYPE;
  children?: MenuItem[];
  disabled?: boolean;
  permissions?: string[];
  itemType?: NavigationItemType;
  groupName?: string | undefined;
  applicationType?: number[];
};
