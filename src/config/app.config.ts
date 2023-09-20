interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Admin'],
  customerRoles: ['Freelancer'],
  tenantRoles: ['Admin', 'Recruiter'],
  tenantName: 'Company',
  applicationName: 'Foox again',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Manage their freelance profile',
    'Apply for jobs',
    'Manage their applications',
    'Update personal user information',
  ],
  ownerAbilities: ['Manage country data', 'Manage freelance profiles', 'Manage job postings', 'Manage applications'],
  getQuoteUrl: 'https://app.roq.ai/proposal/cad2e031-87c2-49d2-92e7-e81b6272c9b1',
};
