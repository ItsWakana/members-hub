# Members Hub

## What I learned

- Authenticating users using passportJS and the local strategy. This enabled users to create accounts and also log in. PassportJS uses session ids and cookies which the client gets from the server.

- Giving users access to certain features based on whether they have memberStatus or not and whether they  were logged in. Inside the EJS templates I used statements to only display certain data if the conditions inside the req.user object were valid. So it was good practice with user authentication.

