import { NzIconService } from 'ng-zorro-antd/icon';
import { EMPTY, Observable } from 'rxjs';
import {SVG_ICONS} from "@core/constants/icon";

export function iconFactory(iconService: NzIconService): () => Observable<void> {
  const path: string = 'assets/outline/';

  Object.values(SVG_ICONS).forEach((name: string) => {
    iconService.addIcon({
      name,
      icon: `${path}${name}.svg`,
    });
  });

  return (): Observable<never> => EMPTY;
}
