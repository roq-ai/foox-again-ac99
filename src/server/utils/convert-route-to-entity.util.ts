const mapping: Record<string, string> = {
  applications: 'application',
  companies: 'company',
  countries: 'country',
  'freelance-profiles': 'freelance_profile',
  hirings: 'hiring',
  jobs: 'job',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
