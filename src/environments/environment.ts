// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://localhost:7284/api',
  stripe: {
    publicKey: 'pk_test_51QSH8KJJodbbdv8e45vr4FDkM7b2PR0IOehuzYGhvq7ts6cnlwPvfSg3807fYAoChBYaOIZXr7o422Oeix2gsr2G00kncl13tR',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
