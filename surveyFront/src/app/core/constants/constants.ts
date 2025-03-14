export class Constants {
  public static readonly Grid = {
    defaultPageIndex: 0,
    defaultPageSize: 10,
    defaultPageSizes: [5, 10, 25, 50, 100, 200],
  };
  public static readonly DEFAULT_PARAMS: any = {
    filters: '{}',
    first: 0,
    rows: 10,
    sortField: 'id',
    sortOrder: 0,
  };

  public static readonly DEFAULT_LANGUAGE: Language = {
    label: 'Oʻzbekcha',
    code: 'uz_latn',
    flag: 'UZ.svg',
  };
  public static readonly LANGUAGES: Language[] = [
    { ...this.DEFAULT_LANGUAGE },
    { label: 'Ўзбекча', code: 'uz_cyrl', flag: 'UZ.svg' },
    { label: 'Русский', code: 'ru', flag: 'RU.svg' },
    // { label: 'English', code: 'en', flag: 'US.svg' },
  ];
  public static readonly LANGUAGES_CODES = this.LANGUAGES.map((el) => el.code);

  public static readonly LOCAL_STORAGE_KEYS = {
    language: 'language',
    accessToken: 'accessToken',
  };

  public static readonly ROLES = {
    ADMIN: 'АДМИНИСТРАТОР',
  };
}

export type TypesRoles = 'АДМИНИСТРАТОР';

export interface Language {
  label: string;
  code: string;
  flag: string;
}
