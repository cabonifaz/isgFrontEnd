// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // LOCALHOST
  url: 'http://localhost:8080'
  //DB -> staging
  // url: 'https://isgbackstaging-g0cecfhhgkbpf2aw.brazilsouth-01.azurewebsites.net'
  //DB -> isg_preprod
  url: 'https://isgbackpreprod-f4dycfg6cneaf4db.brazilsouth-01.azurewebsites.net'
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
