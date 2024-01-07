# AuthonomySDK

AuthonomySDK is a JavaScript library providing easy integration with the Authonomy service for web applications. It simplifies user authentication and authorization processes, leveraging Authonomy's secure backend.

## Features

- User Sign-up and Authentication
- Access Token Generation
- Access List Retrieval
- Access Verification

## Installation

To install AuthonomySDK, use npm:

```bash
npm install authonomysdk
```

## Usage

Here's a quick example to get you started:

```js
import { AuthonomySDK } from 'authonomysdk';

const sdk = new AuthonomySDK({
  appDid: "your_app_did",
  appSecret: "your_app_secret",
  serviceUrl: "http://localhost:8081"
});

// Sign up or authenticate a user
sdk.signUp((data) => {
  console.log("User data:", data);
});

// Fetch access token
sdk.getAccessToken("your_oauth_credential", "your_policy_credential", (error, data) => {
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Access token:", data.access_token);
  }
});

// Verify access
// Developer can use it as a middleware too
// response: "true" / "false" 
sdk.verifyAccess(accessToken, attribute, (error, data) => {
    if (error) {
        console.error('Failed to verify access:', error);
        return;
    }
    console.log('Access verification:', data);
});


// Get access list
// example response:
// {
//   "application_policy": {
//     "id": "did:key:z6MkmrniEq3Cg7bv21BVbX8qkgJUPsAT6yPcBXoMKBvYtMAu",
//     "roles": [
//       {
//         "permissions": [
//           "create_user",
//           "delete_user",
//           "edit_settings"
//         ],
//         "roleName": "admin"
//       },
//       {
//         "permissions": [
//           "view_content",
//           "comment"
//         ],
//         "roleName": "user"
//       }
//     ]
//   },
//   "user_access_list": {
//     "id": "did:key:z6Mkqw8Lz1UVwx9U12CUJ9gQdo7Xsuf75YeM9Zkc52hSw2Xn",
//     "roles": [
//       {
//         "permissions": [
//           "view_content",
//           "comment"
//         ],
//         "roleName": "user"
//       }
//     ]
//   }
// }
sdk.getAccessList(accessToken, (error, data) => {
    if (error) {
        console.error('Failed to get access list:', error);
        return;
    }
    console.log('Access list:', data);
});
```
