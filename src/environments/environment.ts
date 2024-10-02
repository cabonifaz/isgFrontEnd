// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //DB -> staging
  url: 'https://jazi2uqtnj.execute-api.us-east-2.amazonaws.com'
  //DB -> isg_preprod
  //url: 'https://d0z1siqns0.execute-api.us-east-2.amazonaws.com'
  //DB -> prod
  // url: 'https://i6qy8cjk3j.execute-api.us-east-1.amazonaws.com'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
