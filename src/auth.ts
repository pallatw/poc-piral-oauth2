import { AuthConfig } from 'piral-auth';

import { setupAdalClient } from 'piral-adal';

// export const client = setupAdalClient({
//   clientId: 'my-client-id',
//   redirectUri: `${location.origin}/auth`,
// });

// export function account() {
//   return client.account();
// }

export function getUser():AuthConfig {
    return  {
        user: {
          id: "1",
          firstName: 'Hans',
          lastName: 'Zimmermann',
          mail:"",
          language:"",
          permissions:{},
          features:{},
        }
      }
}