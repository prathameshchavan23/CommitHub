# DevTinder APIs

## AuthRouter

- POST /signup
- POST /login
- POST /Logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter

- POST /request/send/:status/:userId // status can be ignored or interested
- POST /request/review/:status/:requestId // status can be accepted or rejected

## userRouter

- GET /user/requests/received
- GET /user/connections
- GET /user/feed - Gets you the profiles of other users on platform

Status: ignore, interested, accepted, rejected
