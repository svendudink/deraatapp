export const ROUTES = {
  HOME:        'Home',
  SAFES_LIST:  'SafesList',
  DETAILED:    'DetailedProduct',
} as const;

export type RootStackParamList = {
  [ROUTES.HOME]:        undefined;
  [ROUTES.SAFES_LIST]:  undefined;
  [ROUTES.DETAILED]:    { articleNumber: string };
};
